# frozen_string_literal: true

class ArticleUnpublishService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process
    unpublish if article.status == "published"
  end

  private

    def unpublish
      article.update!(status: "draft")
      article.schedule.update!(unpublish_at: nil)
    end
end
