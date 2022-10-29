
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

task bulk_update: [:environment] do
  bulk_update
end

def bulk_update
  Article.where(category_id: 3).update_all(category_id: 4)
  Category.find(3).destroy
end

def create_sample_categories!
  puts "Seeding with sample category..."
  Category.create!(
    name: "NASA",
    user_id: 1
  )
  Category.create!(
    name: "ISRO",
    user_id: 1
  )
  Category.create!(
    name: "SpaceX",
    user_id: 1
  )
  Category.create!(
    name: "Russia",
    user_id: 1
  )
  puts "Done! Categories created."
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
    title: "Welcome to NASA",
    body: "NASA is an independent agency of the United States federal government responsible for the civilian space program, as well as aeronautics and space research.",
    category_id: 1,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "Welcome to ISRO",
    body:"The Indian Space Research Organisation (ISRO) is the space agency of the Government of India headquartered in the city of Bengaluru. Its vision is to harness space technology for national development while pursuing space science research and planetary exploration.",
    category_id: 2,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "Welcome to SpaceX",
    body: "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.",
    category_id: 3,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "Welcome to Russia",
    body: "Russia, also officially known as the Russian Federation, is a transcontinental country in Eastern Europe and Northern Asia. At 17,075,400 square kilometres (6,612,100 sq mi), Russia is the largest country in the world, covering more than one-eighth of the Earth's inhabited land area, and the ninth most populous, with about 146.79 million people as of 2018.",
    category_id: 4,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "Welcome to China",
    body: "China, officially the People's Republic of China (PRC), is a country in East Asia and the world's most populous country, with a population of around 1.404 billion. Covering approximately 9,600,000 square kilometres (3,700,000 sq mi), it is the third- or fourth-largest country by total area.",
    category_id: 4,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "Welcome to India",
    body: "India, officially the Republic of India (Bhārat Gaṇarājya), is a country in South Asia. It is the seventh-largest country by area, the second-most populous country (with over 1.2 billion people), and the most populous democracy in the world.",
    category_id: 2,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title: "Welcome to USA",
    body: "The United States of America (USA), commonly known as the United States (U.S. or US) or America, is a country consisting of 50 states, a federal district, five major self-governing territories, and various possessions. At 3.8 million square miles, it is the world's third or fourth-largest country by total area and is slightly smaller than the entire continent of Europe.",
    category_id: 4,
    user_id: 1,
    status: 1
  )
  Article.create!(
    title:  "Welcome to Canada",
    body: "Canada is a country in the northern part of North America. Its ten provinces and three territories extend from the Atlantic to the Pacific and northward into the Arctic Ocean, covering 9.98 million square kilometres (3.85 million square miles), making it the world's second-largest country by total area and the fourth-largest country by land area.",
    category_id: 4,
    user_id: 1,
    status: 1
  )

  puts "Done! Sample articles created."
end
