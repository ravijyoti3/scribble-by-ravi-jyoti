# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @redirection = create(:redirection, organization: @organization)
  end

  def test_redirection_from_path_shouldnt_be_null
    @redirection.from = ""
    assert_not @redirection.valid?
  end

  def test_redirection_to_path_shouldnt_be_null
    @redirection.to = ""
    assert_not @redirection.valid?
  end

  def test_redirection_from_path_should_be_unique
    test_redirection = @redirection.dup
    assert_not test_redirection.valid?
  end

  def test_redirection_to_and_from_shouldnt_be_same
    @redirection.from = @redirection.to
    assert_not @redirection.valid?
  end

  def test_redirection_shouldnt_create_redirection_cycle
    first_redirection = create(:redirection, organization: @organization)
    second_redirection = create(:redirection, organization: @organization)
    third_redirection = create(:redirection, organization: @organization)

    second_redirection.from = first_redirection.to
    second_redirection.save!
    third_redirection.from = second_redirection.to
    third_redirection.save!
    third_redirection.to = first_redirection.from

    assert third_redirection.invalid?
  end
end
