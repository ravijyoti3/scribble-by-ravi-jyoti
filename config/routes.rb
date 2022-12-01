# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :admin do
        resources :articles, only: %i[index create destroy show ]
        resource :organization, only: %i[update show create]
        resources :categories, only: %i[index create destroy show]
        resources :redirections, only: %i[index create destroy update]
        resources :categories, only: :update do
          put "position_update", on: :collection
        end
        resources :articles, only: :update do
          put "position_update", on: :collection
          put "bulk_update", on: :collection
        end
      end

      namespace :public do
        resources :categories, only: :index
        resources :articles, only: %i[index show], param: :slug
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
