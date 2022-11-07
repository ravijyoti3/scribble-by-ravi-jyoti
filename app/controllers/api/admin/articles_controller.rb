# frozen_string_literal: true

class Api::Admin::ArticlesController < ApplicationController
  before_action :current_user!, only: %i[show update destroy index show_by_slug]
  before_action :load_article!, only: %i[show update destroy]

  def index
    @articles = ArticleFilterationService.new(
      @_current_user.articles, params[:categories], params[:status],
      params[:search]).process
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

  def show_by_slug
    @article = @_current_user.articles.find_by!(slug: params[:slug])
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
