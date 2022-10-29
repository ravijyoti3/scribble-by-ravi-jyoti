# frozen_string_literal: true

json.extract! article, :id, :title, :body, :status, :category_id,:slug, :created_at, :updated_at
json.category article.category, :id, :name
