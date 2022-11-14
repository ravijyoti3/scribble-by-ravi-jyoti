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
    filtered_articles = articles.all
    filtered_articles = filtered_articles.where(status: status) if status.present?
    filtered_articles = filtered_articles.where(category_id: category_ids) if category_ids.present?
    filtered_articles = filtered_articles.where("title iLIKE ?", "%#{search}%") if search.present?
    filtered_articles
  end
end
