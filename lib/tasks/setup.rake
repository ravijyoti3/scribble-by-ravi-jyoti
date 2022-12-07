# frozen_string_literal: true

require "yaml"
require "faker"
desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_organization
    create_sample_user
    create_sample_categories
    create_sample_draft_articles
    create_sample_published_articles
    puts "Done! Sample data added."
  end
end

def create_sample_organization
  Organization.create!(
    name: "Spinkart",
  )
end

def create_sample_user
  User.create!(
    name: "Oliver Smith",
    email: "oliver@example.com",
    organization_id: Organization.first.id,
  )
end

def create_sample_categories
  3.times do
    User.first.categories.create!(
      name: Faker::Lorem.word,
    )
  end
end

def create_sample_draft_articles
  Category.all.each do |category|
    User.first.articles.create!(
      title: Faker::Lorem.sentence,
      body: Faker::Lorem.paragraph,
      category_id: category.id,
    )
  end
end

def create_sample_published_articles
  Category.all.each do |category|
    User.first.articles.create!(
      title: Faker::Lorem.sentence,
      body: Faker::Lorem.paragraph,
      category_id: category.id,
      status: 1,
    )
  end
end
