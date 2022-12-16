# frozen_string_literal: true

class SampleDataSeederService
  require "faker"
  require "database_cleaner/active_record"

  DatabaseCleaner.strategy = :truncation

  def process
    clean_database
    create_sample_data
  end

  def clean_database
    DatabaseCleaner.clean
  end

  def create_sample_data
    create_sample_organization
    create_sample_user
    create_sample_categories
    create_sample_draft_articles
    create_sample_published_articles
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
end
