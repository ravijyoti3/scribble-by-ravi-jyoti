# frozen_string_literal: true

require "yaml"

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_organization_name!
    create_sample_user!
    seed_sample_categories!
    seed_sample_articles!
    puts "Done! Sample data added."
  end
end

def create_sample_user!
  puts "Seeding with default users..."
  User.create!(
    name: "Oliver Smith",
    email: "oliver@example.com",
    organization_id: 1
  )
  puts "Done! User Oliver Smith created."
end

def create_sample_organization_name!
  puts "Seeding with sample oragnization name and password..."
  Organization.create!(
    name: "Spinkart",
    password: ""
  )
  puts "Done! Oragnization Spinkart has been created."
end

def seed_sample_categories!
  puts "Seeding sample categories"
  categories = YAML.load_file("db/seed_data/categories.yml")
  for category in categories
    Category.create!(category)
  end
end

def seed_sample_articles!
  puts "Seeding sample articles"
  articles = YAML.load_file("db/seed_data/articles.yml")
  for article in articles
    Article.create!(article)
  end
end
