# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "admin/articles/article", article: article
  json.author article.user, :id, :name
end
