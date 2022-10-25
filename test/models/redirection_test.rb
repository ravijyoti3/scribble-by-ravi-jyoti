# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
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
    test_redirection = create(:redirection)
    test_redirection.from = test_redirection.to
    assert_not test_redirection.valid?
  end

  def test_redirection_shouldnt_create_redirection_cycle
    first_redirection = create(:redirection)
    second_redirection = create(:redirection)
    third_redirection = create(:redirection)

    second_redirection.from = first_redirection.to
    third_redirection.from = second_redirection.to
    third_redirection.to = first_redirection.from

    assert_not third_redirection.valid?
  end
end
