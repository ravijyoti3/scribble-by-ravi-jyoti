# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    association :organization, factory: :organization
    from { Faker::Internet.url(host: "example.com") }
    to { Faker::Internet.url(host: "example.com") }
  end
end
