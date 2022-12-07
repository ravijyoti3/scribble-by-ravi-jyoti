# frozen_string_literal: true

json.extract! article, :id, :title, :body, :status, :category_id, :slug, :versions, :created_at, :updated_at,
  :restored_from
json.category article.category, :id, :name
json.visits article.visits, :id, :visit, :visited_at
