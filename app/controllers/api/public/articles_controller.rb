# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  def index
    @articles = ArticleFilterationService.new(
      current_user.articles, nil, "published", params[:search]).process.order("updated_at DESC")
  end

  def show
    @article = current_user.articles.find_by!(slug: params[:slug])
    @visit = @article.visits.find_by(visited_at: Time.zone.today)
    if @visit
      @visit.increment!(:visit)
    else
      @article.visits.create!(visited_at: Time.zone.today)
    end
  end
end
