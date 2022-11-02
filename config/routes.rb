# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :admin do
      resources :articles, only: %i[index create destroy show update]
      resource :organization, only: %i[update show create]
      resources :categories, only: %i[create destroy show]
      resources :redirections, only: %i[index create destroy update]
      resources :categories, only: :update do
        collection do
          put "position_update"
        end
      end
    end

    namespace :public do
      resources :categories, only: :index
      resources :articles, only: :show, param: :slug do
        member do
          get "show_by_slug"
        end
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
