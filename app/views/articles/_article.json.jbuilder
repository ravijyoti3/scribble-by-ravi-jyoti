# frozen_string_literal: true

json.extract! article, :id, :title, :body, :status, :category_id
json.category article.category, :id, :name
