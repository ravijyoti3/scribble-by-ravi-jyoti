# frozen_string_literal: true

require "test_helper"

class Api::Admin::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
  end

  def test_should_show_organization
    get api_admin_organization_path, as: :json
    assert_response :success
  end

  def test_should_acces_with_valid_credentials
    post api_admin_organization_path, params: { password: @organization.password }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @organization.authentication_token
  end

  def test_shouldnt_authorize_with_invalid_credentials
    post api_admin_organization_path, params: { organization: { password: "invalid password" } }, as: :json
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["error"], t("organization.incorrect_credential")
  end

  def test_should_update_organization
    put api_admin_organization_path, params: { name: "LRRB", password: "Weclome123" }, as: :json
    assert_response :success
    assert_equal response.parsed_body["notice"], t("successfully_updated", entity: Organization)
  end

  def test_should_update_password
    put api_admin_organization_path,
      params: { name: "new name", password: "Welcome123", is_password_protected: true }, as: :json
    assert_response :success
    assert_equal response.parsed_body["notice"], t("successfully_updated", entity: Organization)
  end
end
