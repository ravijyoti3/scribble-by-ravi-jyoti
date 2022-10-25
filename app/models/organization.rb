# frozen_string_literal: true

class Organization < ApplicationRecord
  validates :name, presence: true
  has_secure_password validations: false
  has_secure_token :authentication_token
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
