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

  def position_update
    position = 1
    category_id_list = params[:category_id_list]
    category_id_list.each do |pos|
      category = Category.find_by!(id: pos)
      category.position = position
      position = position + 1
      category.save!
    end
    render status: :ok, json: { notice: "Position successfully updated" }
  end

  def update
    category = Category.find(params[:id])
    category.update!(category_params)
    render status: :ok, json: { notice: "Successfully updated" }
  end

  def show
    @category = Category.find(params[:id])
    render
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    render status: :ok, json: { notice: "Category was successfully deleted" }
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
