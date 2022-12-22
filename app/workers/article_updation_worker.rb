# frozen_string_literal: true

class ArticleUpdationWorker
  include Sidekiq::Worker

  def perform(schedule_id)
    schedule = Schedule.find(schedule_id)
    article = Article.find(schedule.article_id)
    perform_schedule(article, schedule)
  end

  private

    def perform_schedule(article, schedule)
      if schedule.publish_at.present? && schedule.publish_at.past?
        article.update(status: "published")
        schedule.update(publish_at: nil)
      elsif schedule.unpublish_at.present? && schedule.unpublish_at.past?
        article.update(status: "draft")
        schedule.update(unpublish_at: nil)
      end
    end
end
