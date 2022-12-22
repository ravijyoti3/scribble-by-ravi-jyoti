# frozen_string_literal: true

class ArticleStatusUpdateService
  def process
    Schedule.all.each do |schedule|
      ArticleUpdationWorker.perform_async(schedule.id)
    end
  end
end
