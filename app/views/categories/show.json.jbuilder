json.category do
  json.extract! @category, :id, :name, :updated_at
  json.article_count @category.articles.count
end
