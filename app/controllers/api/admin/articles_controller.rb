# frozen_string_literal: true

class Api::Admin::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy position_update ]

  def index
    @articles = ArticleFilterationService.new(
      current_user.articles, params[:categories], params[:status],
      params[:search]).process.order(position: :asc)
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def position_update
    @article.insert_at(params[:final_position])
  end

  def show
    render
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def bulk_update
    ArticlesCategoryUpdationService.new(current_user, params[:ids], params[:category_id]).process
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id, :restored_from)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
