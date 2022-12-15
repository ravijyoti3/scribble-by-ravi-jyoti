# frozen_string_literal: true

json.partial! "api/admin/articles/article", article: @article
if @article.schedule.present?
  json.schedule @article.schedule, :id, :publish_at, :unpublish_at, :article_id
end
