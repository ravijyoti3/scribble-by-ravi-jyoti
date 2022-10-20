# frozen_string_literal: true

class Site < ApplicationRecord
  has_secure_password
  validates :name, presence: true, length: { maximum: 45 }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
