# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles
  validates :name, presence: true, uniqueness: true

  before_create :set_position

  private

    def set_position
      max_position = Category.maximum(:position)
      self.position = (max_position.nil?) ? 0 : (max_position + 1)
    end
end
