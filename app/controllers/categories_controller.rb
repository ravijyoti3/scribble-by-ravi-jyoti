# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = Category.all
    render
  end

  def create
    category = Category.new(category_params)
    if category.save!
      render status: :ok, json: { notice: "Category was successfully created" }
    else
      render status: :unprocessable_entity, json: { notice: "Category already exists" }
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
