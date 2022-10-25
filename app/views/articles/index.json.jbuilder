json.articles @articles do |article|
  json.extract! article, :id, :title, :body, :category_id, :slug, :status, :updated_at
  json.category article.category, :id, :name
  json.author article.user, :id, :name
end
