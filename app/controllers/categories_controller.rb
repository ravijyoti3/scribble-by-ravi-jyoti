# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = Category.all
    render
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success(t("successfully_created", entity: Category))
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
    respond_with_success(t("position_successfully_updated", entity: Category))
  end

  def update
    category = Category.find(params[:id])
    category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: Category))
  end

  def show
    @category = Category.find(params[:id])
    render
  end

  def destroy
    @category = Category.find(params[:id])
    ArticleBulkUpdate.new(Article, params[:id], params[:new_id]).bulk_update
    @category.destroy
    respond_with_success(t("successfully_deleted", entity: Category))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
