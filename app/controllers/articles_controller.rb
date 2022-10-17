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

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end
end
