# frozen_string_literal: true

require "test_helper"

class ApplicationCable::ConnectionTest < ActionCable::Connection::TestCase
  include FactoryBot::Syntax::Methods

  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_connection_success_when_auth_token_and_email_is_set_correctly
    connect params: { id: @user.id }
    assert_equal connection.current_user, @user
  end

  def test_connection_fails_when_credentials_are_empty
    assert_reject_connection { connect }
  end

  def test_connection_fails_when_user_is_not_verified
    assert_reject_connection {
      connect params: {
        id: "12343"
      }
    }
  end
end
