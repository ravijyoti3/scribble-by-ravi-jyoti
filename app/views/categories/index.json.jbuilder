json.categories @categories do |category|
  json.extract! category, :id, :name, :updated_at
end
