json.extract! @category, :id, :name, :updated_at
json.articles @category.articles, :id, :title, :body, :slug, :category_id, :status
