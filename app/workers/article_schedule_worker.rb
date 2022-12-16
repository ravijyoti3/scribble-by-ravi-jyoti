# frozen_string_literal: true

class ArticleScheduleWorker
  include Sidekiq::Worker
  sidekiq_options queue: :default, retry: 10

  def perform
    publish_schedules = Schedule.select { |schedule|
     (schedule.publish_at.present? && schedule.publish_at <= Time.zone.now) }

    unpublish_schedules = Schedule.select { |schedule|
      (schedule.unpublish_at.present? && schedule.unpublish_at <= Time.zone.now) }

    publish_schedules.each do |schedule|
      article_schedule_service = ArticlePublishService.new(article(schedule))
      article_schedule_service.process
    end

    unpublish_schedules.each do |schedule|
      article_schedule_service = ArticleUnpublishService.new(article(schedule))
      article_schedule_service.process
    end
 end

  private

    def article(schedule)
      Article.find(schedule.article_id)
    end
end
