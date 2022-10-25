# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    name { Faker::Name.name[0..49] }
    password { "password1" }
    password_protected { true }
  end
end
