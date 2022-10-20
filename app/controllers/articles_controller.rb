# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    @articles = Article.all
    render
  end

  def create
    article = Article.new(article_params)
    article.save!
    render status: :ok, json: { notice: "Article was successfully created" }
  end

  def bulk_update
    articles = Article.where(category_id: params[:category_id])
    articles.each do |article|
      article.update(category_id: params[:new_category_id])
    end
    render status: :ok, json: { notice: "Articles successfully updated" }
  end

  def destroy
    article = Article.find(params[:id])
    article.destroy
    render status: :ok, json: { notice: "Article was successfully deleted" }
  end

  def show
    @article = Article.find(params[:id])
    render
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end
end
