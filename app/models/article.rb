# frozen_string_literal: true

class Article < ApplicationRecord
  validates :title, :body, :status, presence: true
  enum status: %i[draft published]
  belongs_to :category
end
