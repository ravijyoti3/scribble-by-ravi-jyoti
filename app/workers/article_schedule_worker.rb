# frozen_string_literal: true

class ArticleScheduleWorker
  include Sidekiq::Worker

  def perform
    schedule_service = ArticleStatusUpdateService.new
    schedule_service.process
  end
end
