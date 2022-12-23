# frozen_string_literal: true

class ArticleStatusUpdateService
  def process
    Schedule.all.each do |schedule|
      ArticleUpdationWorker.perform_async(schedule.id) if schedule_to_execute?(schedule)
    end
  end

  private

    def schedule_to_execute?(schedule)
      (schedule.publish_at.present? && schedule.publish_at.past?) ||
        (schedule.unpublish_at.present? && schedule.unpublish_at.past?)
    end
end
