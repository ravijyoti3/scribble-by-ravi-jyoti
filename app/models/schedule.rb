# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  validates :article_id, presence: true

  validate :cannot_publish_before_present_time, if: -> { self.publish_at.present? }
  validate :cannot_unpublish_before_present_time, if: -> { self.unpublish_at.present? }
  validate :cannot_publish_before_unpublish, :cannot_unpublish_before_publish, if: -> {
 self.unpublish_at.present? && self.publish_at.present? }

  private

    def cannot_publish_before_present_time
      if self.publish_at < Time.zone.now
        errors.add(:publish_at, t("schedule.before_present_time"))
      end
    end

    def cannot_unpublish_before_present_time
      if self.unpublish_at < Time.zone.now
        errors.add(:unpublish_at, t("schedule.before_present_time"))
      end
    end

    def cannot_publish_before_unpublish
      if self.publish_at < self.unpublish_at && article.status == "published"
        errors.add(:publish_at, t("schedule.before_unpublish"))
      end
    end

    def cannot_unpublish_before_publish
      if self.unpublish_at < self.publish_at && article.status == "draft"
        errors.add(:unpublish_at, t("schedule.before_publish"))
      end
    end

    def article
      Article.find(self.article_id)
    end
end
