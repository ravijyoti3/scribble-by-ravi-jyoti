# frozen_string_literal: true

class ArticleFilterationService
  attr_reader :articles, :category_ids, :status, :search

  def initialize(articles, category_ids, status, search)
    @articles = articles
    @category_ids = category_ids
    @status = status
    @search = search
  end

  def process
    @articles = filter_by_status if status.present?
    @articles = filter_by_category if category_ids.present?
    @articles = filter_by_search if search.present?
    @articles
  end

  private

    def filter_by_status
      articles.where(status: status)
    end

    def filter_by_category
      articles.where(category_id: category_ids)
    end

    def filter_by_search
      articles.where("title iLIKE ?", "%#{search}%")
    end
end
