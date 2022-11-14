# frozen_string_literal: true

json.categories @categories do |category|
  json.partial! "api/admin/categories/category", category: category
end
