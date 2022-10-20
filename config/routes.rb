# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, only: %i[index create destroy show]
    resource :sites, only: %i[create update]
    resources :categories, only: %i[index create destroy show]
    resources :categories, only: :update do
      collection do
        put "position_update"
      end
    end

    resources :articles, only: :update do
      collection do
        put "bulk_update"
      end
    end

  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
