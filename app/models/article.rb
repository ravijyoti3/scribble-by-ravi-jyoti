# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 50
  validates :title, :body, :status, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  enum status: %i[draft published]
  belongs_to :category
  belongs_to :user

  before_save :set_slug

  private

    def set_slug
      if status == "published" && slug == nil
        title_slug = title.parameterize
        latest_article_slug = Article.where(
          "slug LIKE ? or slug LIKE ?",
          "#{title_slug}",
          "#{title_slug}-%"
        ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
        slug_count = 0
        if latest_article_slug.present?
          slug_count = latest_article_slug.split("-").last.to_i
          only_one_slug_exists = slug_count == 0
          slug_count = 1 if only_one_slug_exists
        end
        slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
        self.slug = slug_candidate
      elsif status == "draft" && slug == nil
        self.slug = nil
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
