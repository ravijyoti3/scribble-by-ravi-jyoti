# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :current_user!, only: %i[show update destroy index]
  before_action :load_article!, only: %i[show update destroy]

  def index
    category_ids = params[:categories].split(",").map(&:to_i) if params[:categories].present?
    @articles = @_current_user.articles.all
    @articles = @articles.where(status: params[:status]) if params[:status].present?
    @articles = @articles.where(category_id: category_ids) if category_ids.present?
    @articles = @articles.where("title LIKE ?", "%#{params[:search]}%") if params[:search].present?
    render
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def destroy
    @article.destroy
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def show
    render
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end

    def load_article!
      @article = @_current_user.articles.find(params[:id])
    end
end
