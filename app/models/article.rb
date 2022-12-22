# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 50
  MAX_PAGE_SIZE = 10

  enum status: %i[draft published]

  belongs_to :category
  belongs_to :user
  has_many :visits
  has_one :schedule, dependent: :destroy

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :body, :status, presence: true

  validate :slug_not_changed

  before_create :set_slug, if: -> { status == "published" }
  before_update :set_slug, if: -> { status == "published" && !slug }
  before_update :delete_schedules, if: -> { status_changed? && self.schedule.present? }

  acts_as_list scope: :category
  has_paper_trail only: %i[title body status category_id]
  paginates_per MAX_PAGE_SIZE

  private

    def set_slug
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
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end

    def delete_schedules
      self.schedule.unpublish_at = nil if status == "draft"
      self.schedule.publish_at = nil if status == "published"
      self.schedule.save!
    end
end
