# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :current_user!, only: %i[index]

  def index
    @categories = current_user!.categories
  end
end
