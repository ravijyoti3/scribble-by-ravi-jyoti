# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_name_shouldnt_be_valid_and_saved_without_name
    @category.name = ""
    assert_not @category.valid?
  end

  def test_name_should_be_of_valid_length
    @category.name = "a" * (Category::MAX_NAME_LENGTH + 1)
    assert_not @category.valid?
  end

  def test_name_should_be_unique
    @category.save!

    test_category = @category.dup
    assert_not test_category.valid?
  end

  def test_position_should_be_set_on_create
    @category.save!
    assert_not_nil @category.position
  end

  def test_position_should_be_incremented_on_create
    @category.save!
    test_category = build(:category, user: @category.user)
    test_category.save!
    assert_equal @category.position + 1, test_category.position
  end

  def test_shouldnt_create_category_without_user
    @category.user = nil
    assert_not @category.valid?
  end

  def test_should_delete_category_when_user_is_deleted
    @category.save!
    @user.destroy
    assert_not Category.exists?(@category.id)
  end
end
