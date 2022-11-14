# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 50

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_NAME_LENGTH }

  has_many :articles
  belongs_to :user

  acts_as_list scope: :user
end
