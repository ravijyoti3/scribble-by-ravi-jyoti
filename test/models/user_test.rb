# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_user_shouldnt_be_valid_without_name
    @user.name = ""
    assert_not @user.valid?
  end

  def test_name_should_be_of_valid_length
    @user.name = "a" * (User::MAX_NAME_LENGTH + 1)
    assert_not @user.valid?
  end

  def test_user_shouldnt_be_valid_without_email
    @user.email = ""
    assert_not @user.valid?
  end

  def test_user_shouldnt_valid_if_email_not_unique
    @user.save!

    test_user = @user.dup
    assert_not test_user.valid?
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "OLIVER@EXAMPLE.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[oliver@example.com OLIVER@example.COM US-ER@example.org
      first.last@example.in user+one@example.ug.in]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_validation_shouldnt_accept_invalid_addresses
    invalid_emails = %w[oliver@example,com oliver_at_example.org user.name@example.
      @sam-sam.com sam@sam+exam.com fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_should_delete_user_when_organization_is_deleted
    @user.save!
    @organization.destroy
    assert_not User.exists?(@user.id)
  end
end
