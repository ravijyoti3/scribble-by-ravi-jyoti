# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article, only: %i[show update destroy]

  def index
    @articles = Article.all
    render
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def bulk_update
    articles = Article.where(category_id: params[:category_id])
    articles.each do |article|
      article.update(category_id: params[:new_category_id])
    end
    respond_with_success(t("successfully_moved", entity: "Article"))
  end

  def destroy
    article = Article.find(params[:id])
    article.destroy
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def show
    @article = Article.find(params[:id])
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

    def load_article
      @article = Article.find(params[:id])
    end
end
