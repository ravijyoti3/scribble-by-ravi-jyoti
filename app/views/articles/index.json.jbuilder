json.articles @articles do |article|
  json.partial! "articles/article", article: article
  json.author article.user, :id, :name
end
