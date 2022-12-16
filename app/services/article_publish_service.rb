# frozen_string_literal: true

class ArticlePublishService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process
    publish if article.status == "draft"
  end

  private

    def publish
      article.update!(status: "published")
      article.schedule.update!(publish_at: nil)
    end
end
