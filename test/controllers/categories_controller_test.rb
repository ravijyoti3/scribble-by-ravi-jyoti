# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_create_category
    post categories_path, params: { category: { name: "NASA", user_id: @user.id } }, as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: Category), response_json["notice"]
  end

  def test_should_show_all_categories
    get categories_path, as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal @user.categories.count, response_json["categories"].count
  end

  def test_should_delete_category
    @category.save
    delete category_path(@category.id), as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: Category), response_json["notice"]
  end

  def test_should_not_delete_last_category_if_it_is_general
    @category.destroy
    Category.new(name: "General", user_id: @user.id).save!
    @category = @user.categories.last
    delete category_path(@category.id), as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal t("category.cannot_be_deleted"), response_json["error"]
  end

  def test_should_update_category
    @category.save
    category_params = { category: { name: "ISRO", user_id: @user.id } }
    put category_path(@category.id), params: category_params, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: Category), response_json["notice"]
  end

  def test_should_update_categories_positions
    first_category = create(:category, user: @user)
    second_category = create(:category, user: @user)
    third_category = create(:category, user: @user)

    category_id_list = [third_category.id, first_category.id, second_category.id]
    last_position = @category.position
    put position_update_categories_path, params: { category_id_list: category_id_list }, as: :json
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("position_successfully_updated", entity: Category), response_json["notice"]
  end
end
