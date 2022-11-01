# frozen_string_literal: true

require "test_helper"

class ArticleBulkUpdateServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_update_article
    new_category = create(:category, user: @user)
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    third_article = create(:article, category: @category, user: @user)
    ArticleBulkUpdateService.new(@user, @category.id, new_category.id).bulk_update
    new_category_ids = Article.where(
      id: [first_article.id, second_article.id,
      third_article.id]).pluck(:category_id).uniq
    assert_equal new_category_ids, [new_category.id]
  end

  def test_should_create_general_category_and_update_article
    ArticleBulkUpdateService.new(@user, @category.id, nil).bulk_update
    new_category_name = Category.last.name
    assert_equal new_category_name, "General"
  end
end
