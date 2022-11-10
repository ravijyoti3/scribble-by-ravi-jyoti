# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :current_user!, only: %i[show_by_slug index]

  def index
    @articles = current_user!.articles.where(status: 1).order("updated_at DESC")
  end

  def show
    @article = current_user!.articles.find_by!(slug: params[:slug])
  end
end
