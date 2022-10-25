# frozen_string_literal: true

class Article < ApplicationRecord
  validates :title, :body, :status, presence: true
  enum status: %i[draft published]
  belongs_to :category
  belongs_to :user

  before_save :set_slug

  def set_slug
    itr = 1
    loop do
      title_slug = title.parameterize
      slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
      break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

      itr += 1
    end
    status == "published" ? self.slug = slug : self.slug = nil
  end
end
