# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_create_category
    post api_admin_categories_path, params: { category: { name: "NASA", user_id: @user.id } }, as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: Category), response_json["notice"]
  end

  def test_should_show_all_categories
    get api_public_categories_path, as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal @user.categories.count, response_json["categories"].count
  end

  def test_should_delete_category
    @category.save
    delete api_admin_category_path(@category.id), as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: Category), response_json["notice"]
  end

  def test_should_update_category
    @category.save
    category_params = { category: { name: "ISRO", user_id: @user.id } }
    put api_admin_category_path(@category.id), params: category_params, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: Category), response_json["notice"]
  end

  def test_should_update_categories_positions
    first_category = create(:category, user: @user)
    second_category = create(:category, user: @user)
    third_category = create(:category, user: @user)
    last_position = third_category.position
    put position_update_api_admin_categories_path, params: { id: first_category.id, final_position: last_position + 1 },
      as: :json
    assert_equal last_position + 1, first_category.reload.position
  end

  def test_should_list_all_categories_for_admin
    get api_admin_categories_path, as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal @user.categories.count, response_json["categories"].count
  end

  def test_should_show_category
    get api_admin_category_path(@category.id), as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal @category.name, response_json["name"]
  end
end
