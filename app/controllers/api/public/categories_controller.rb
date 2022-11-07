# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :current_user!, only: %i[index]

  def index
    @categories = @_current_user.categories.all
    render
  end
end
