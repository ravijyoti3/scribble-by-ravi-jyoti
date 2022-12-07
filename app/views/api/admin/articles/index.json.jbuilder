# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "api/admin/articles/article", article: article
  json.author article.user, :id, :name
end
json.total_count @articles.total_count
json.draft_count @articles.where(status: "draft").total_count
json.published_count @articles.where(status: "published").total_count
