# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  def index
    @articles = ArticleFilterationService.new(
      current_user.articles, nil, "published", params[:search]).process.order("updated_at DESC")
  end

  def show
    @article = current_user.articles.find_by!(slug: params[:slug])
    @article.increment!(:visit)
  end
end
