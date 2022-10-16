json.articles @articles do |article|
  json.extract! article, :id, :title, :status, :created_at
end
