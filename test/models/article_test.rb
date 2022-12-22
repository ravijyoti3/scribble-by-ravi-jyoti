# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
  end

  def test_article_without_title_should_not_be_valid
    @article.title = ""
    assert_not @article.valid?
  end

  def test_article_without_category_should_not_be_valid
    @article.category = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "Category must exist"
  end

  def test_article_without_user_should_not_be_valid
    @article.user = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "User must exist"
  end

  def test_article_lenght_should_not_be_greater_than_max_title_length
    @article.title = "a" * (Article::MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_should_make_slug_nil_initially_if_article_is_drafted
    @article.save!
    assert_nil @article.slug
  end

  def test_should_generate_slug_only_after_article_set_to_publish_for_first_time
    article_title = @article.title
    @article.save!
    assert_nil @article.slug

    @article.status = 1
    @article.save!
    assert_equal article_title.parameterize, @article.slug
  end

  def test_should_ensure_slug_uniqueness_if_article_is_drafted
    @article.status = 1
    @article.save!

    article_slug = @article.slug
    @article.status = 0
    @article.save!

    assert_equal article_slug, @article.slug
  end

  def test_article_slug_is_parameterized_title
    title = @article.title
    @article.status = 1
    @article.save!
    assert_equal title.parameterize, @article.slug
  end

  def test_incremental_slug_generation_for_published_article_with_duplicate_two_worded_titles
    first_article = Article.create!(
      title: "Dummy title", status: 1, category: @category, body: @article.body,
      user: @user)
    second_article = Article.create!(
      title: "Dummy title", status: 1, category: @category, body: @article.body,
      user: @user)

    assert_equal "dummy-title", first_article.slug
    assert_equal "dummy-title-2", second_article.slug
  end

  def test_incremental_slug_generation_for_published_article_with_duplicate_hyphenated_titles
    first_article = Article.create!(
      title: "dummy-title", status: 1, category: @category, body: @article.body,
      user: @user)
    second_article = Article.create!(
      title: "dummy-title", status: 1, category: @category, body: @article.body,
      user: @user)

    assert_equal "dummy-title", first_article.slug
    assert_equal "dummy-title-2", second_article.slug
  end

  def test_slug_generation_for_published_article_having_titles_one_being_prefix_of_the_other
    first_article = Article.create!(title: "fishing", status: 1, category: @category, body: @article.body, user: @user)
    second_article = Article.create!(title: "fish", status: 1, category: @category, body: @article.body, user: @user)

    assert_equal "fishing", first_article.slug
    assert_equal "fish", second_article.slug
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "Dummy"
    first_article = Article.create!(title: title, status: 1, category: @category, body: @article.body, user: @user)
    second_article = Article.create!(title: title, status: 1, category: @category, body: @article.body, user: @user)
    third_article = Article.create!(title: title, status: 1, category: @category, body: @article.body, user: @user)

    assert_equal third_article.slug, "#{title.parameterize}-3"

    second_article.destroy

    expected_slug_suffix_for_new_article = third_article.slug.split("-").last.to_i + 1

    new_article = Article.create!(title: title, status: 1, category: @category, body: @article.body, user: @user)
    assert_equal new_article.slug, "#{title.parameterize}-#{expected_slug_suffix_for_new_article}"
  end

  def test_should_delete_all_articles_associated_with_a_category
    @article.save!
    @category.destroy
    assert_empty Article.all
  end

  def test_should_not_change_slug
    @article.slug = "dummy-slug"
    assert_raises ActiveRecord::RecordInvalid do
      @article.save!
    end
    assert_match t("article.slug.immutable"), @article.errors_to_sentence
  end

  def test_should_delete_schedule_associated_when_article_is_destroyed
    @article.save!
    @article.schedule.destroy
    @article.destroy
    assert_nil @article.schedule
  end

  def test_should_delete_schedule_if_perfomed_explicitly
    @article.update!(status: "draft")
    @schedule.update!(publish_at: Time.zone.now + 5.minutes)
    @article.update!(status: "published")
    assert_nil @article.schedule.publish_at
  end
end
