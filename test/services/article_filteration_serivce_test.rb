# frozen_string_literal: true

require "test_helper"

class ArticleFilterationServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_list_all_articles
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    third_article = create(:article, category: @category, user: @user)
    articles = ArticleFilterationService.new(@user.articles, nil, nil, nil).process
    assert_equal articles, [ first_article, second_article, third_article]
  end

  def test_should_filter_articles_by_category_and_status
    new_category = create(:category, user: @user)
    first_article = create(:article, category: @category, user: @user, status: "draft")
    second_article = create(:article, category: @category, user: @user, status: "published")
    third_article = create(:article, category: new_category, user: @user, status: "draft")
    category_ids_string = [@category.id].join(",")
    articles = ArticleFilterationService.new(@user.articles, category_ids_string, "draft", nil).process
    assert_equal articles, [first_article]
  end

  def test_should_filter_article_by_search
    first_article = create(:article, category: @category, user: @user, title: "First Article")
    second_article = create(:article, category: @category, user: @user, title: "Second Article")
    third_article = create(:article, category: @category, user: @user, title: "Third Article")
    articles = ArticleFilterationService.new(@user.articles, nil, nil, "First").process
    assert_equal articles, [first_article]
  end

  def test_should_filter_article_by_category_status_and_search
    first_category = create(:category, user: @user)
    second_category = create(:category, user: @user)
    first_article = create(:article, category: @category, user: @user, title: "First Article", status: "draft")
    second_article = create(
      :article, category: second_category, user: @user, title: "First Second Article",
      status: "draft")
    third_article = create(:article, category: first_category, user: @user, title: "Third Article", status: "draft")
    category_ids_string = [@category.id, second_category.id].join(",")
    articles = ArticleFilterationService.new(@user.articles, category_ids_string, "draft", "First").process
    assert_equal articles, [first_article, second_article]
  end
end
