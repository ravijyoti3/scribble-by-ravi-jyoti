json.articles @articles do |article|
  json.extract! article, :id, :title, :body, :category_id, :status, :updated_at
  json.category article.category, :id, :name
end
