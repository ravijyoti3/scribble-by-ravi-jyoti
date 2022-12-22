# frozen_string_literal: true

FactoryBot.define do
  factory :schedule do
    association :article, factory: :article
    publish_at { nil }
    unpublish_at { nil }
  end
end
