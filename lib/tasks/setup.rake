
# frozen_string_literal: true

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
    create_sample_categories!
    create_sample_articles!
    puts "Done! Sample data added."
  end
end

def create_sample_categories!
  puts "Seeding with sample category..."
  Category.create!(
    name: "Getting Started",
    user_id: 1
  )
  Category.create!(
    name: "Electronics",
    user_id: 1
  )
  Category.create!(
    name: "Clothing",
    user_id: 1
  )
  Category.create!(
    name: "Redirections",
    user_id: 1
  )
  puts "Done! Category Electronics created."
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
    password: "welcome123"
  )
  puts "Done! Oragnization Spinkart has been created."
end

def create_sample_articles!
  puts "Seeding with sample article..."
  Article.create!(
    title: "Sample Article",
    body: "This is a sample article",
    category_id: 1,
    user_id: 1
  )
  Article.create!(
    title: "Welcome to Scribble",
    body: "I am body and I am supposed to be very long and descriptive.",
    category_id: 2,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "Welcome to Scribble again",
    body: "I am body and I am supposed to be very long and descriptive. But I am not.",
    category_id: 2,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "A very new article title",
    body: "A very new article body, and I am very long and descriptive.",
    category_id: 2,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "A very interesting article title",
    body: "A very interesting article body",
    category_id: 2,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "What is Lorem Ipsum?",
    body: "Lorem Ipsum is simply dummy text of
    the printing and typesetting industry. Lorem Ipsum has
    been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make.",
    category_id: 1,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "Why do we use it?",
    body: "It is a long established fact that a reader will be distracted by the readable
    content of a page when looking at its layout. The point of using Lorem Ipsum is that it
    has a more-or-less normal distribution of letters, as opposed to using 'Content here,
    content here', making it look like readable English. Many desktop publishing packages and
    web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem
    ipsum' will uncover many web sites still in their infancy. Various versions have evolved",
    category_id: 1,
    user_id: 1,
    status: 1
  )
  puts "Done! Sample articles created."
end