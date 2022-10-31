# frozen_string_literal: true

class ArticleBulkUpdateService
  attr_reader :articles, :id, :new_id

  def initialize(articles, id, new_id)
    @articles = articles
    @id = id
    @new_id = new_id
  end

  def bulk_update
    @articles.all.where(category_id: @id).update(category_id: @new_id)
    category_articles = @articles.where(category_id: @id)
    category_articles.update(category_id: @new_id)
  end
end
