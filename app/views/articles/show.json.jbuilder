json.article do
  json.extract! @article, :id, :title, :body, :status, :category_id
  json.category @article.category.name
end
