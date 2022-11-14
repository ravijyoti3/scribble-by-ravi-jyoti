# frozen_string_literal: true

class Api::Admin::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[show update destroy position_update]

  def index
    @categories = current_user.categories.order(:position)
  end

  def create
    current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: Category))
  end

  def position_update
    @category.insert_at(params[:final_position].to_i)
    respond_with_success(t("position_successfully_updated", entity: Category))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: Category))
  end

  def show
    render
  end

  def destroy
    CategoryDeletionService.new(current_user, params[:id], params[:new_id]).process
    respond_with_success(t("successfully_deleted", entity: Category))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category!
      @category = current_user.categories.find(params[:id])
    end
end
