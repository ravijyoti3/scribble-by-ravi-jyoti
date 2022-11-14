# frozen_string_literal: true

require "test_helper"

class CategoryDeletionServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_move_article_to_selected_category
    new_category = create(:category, user: @user)
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    third_article = create(:article, category: @category, user: @user)
    CategoryDeletionService.new(@user, @category.id, new_category.id).process
    new_category_ids = @user.articles.where(
      id: [first_article.id, second_article.id,
      third_article.id]).pluck(:category_id).uniq
    assert_equal new_category_ids, [new_category.id]
  end

  def test_should_create_general_category_and_move_article_if_it_is_last_category
    CategoryDeletionService.new(@user, @category.id, nil).process
    new_category_name = @user.categories.last.name
    assert_equal new_category_name, "General"
  end

  def test_should_not_delete_general_category
    @category.name = "General"
    @category.save!
    CategoryDeletionService.new(@user, @category.id, nil).process
    assert_equal @user.categories.count, 1
  end

  def test_should_not_delete_general_category_if_it_is_last
    @category.name = "General"
    @category.save!
    response = CategoryDeletionService.new(@user, @category.id, nil).process
    assert_nil response
  end
end
