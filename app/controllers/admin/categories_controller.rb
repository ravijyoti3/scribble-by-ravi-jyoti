# frozen_string_literal: true

class Admin::CategoriesController < ApplicationController
  before_action :current_user!, only: %i[show update destroy index]
  before_action :load_category!, only: %i[show update destroy]

  def index
    @categories = @_current_user.categories.all
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
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: Category))
  end

  def show
    render
  end

  def destroy
    if ArticleBulkUpdateService.new(@_current_user, params[:id], params[:new_id]).bulk_update
      @category.destroy
      respond_with_success(t("successfully_deleted", entity: Category))
    else
      respond_with_error(t("category.cannot_be_deleted"))
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category!
      @category = @_current_user.categories.find(params[:id])
    end
end
