# frozen_string_literal: true

require "test_helper"

class ArticleUpdationServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_update_articles
    second_category = create(:category, user: @user)
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    ids = [first_article.id, second_article.id]
    ArticleUpdationService.new(@user, ids, second_category.id).process
    assert_equal second_category.id, first_article.reload.category_id
    assert_equal second_category.id, second_article.reload.category_id
  end

  def test_should_reset_positions_of_articles
    second_category = create(:category, user: @user)
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    third_article = create(:article, category: second_category, user: @user)
    ids = [first_article.id]
    ArticleUpdationService.new(@user, ids, second_category.id).process
    assert_equal 2, first_article.reload.position
    assert_equal 1, second_article.reload.position
  end
end
