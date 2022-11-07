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
    category_ids = @category_ids.split(",").map(&:to_i) if @category_ids.present?
    @articles = @articles.all
    @articles = @articles.where(status: @status) if @status.present?
    @articles = @articles.where(category_id: category_ids) if category_ids.present?
    @articles = @articles.where("title LIKE ?", "%#{@search}%") if @search.present?
    @articles
  end
end
