# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :current_user!, only: %i[show_by_slug index]

  def show_by_slug
    @article = @_current_user.articles.find_by!(slug: params[:slug])
    render
  end

  def index
    @articles = @_current_user.articles.where(status: 1).order("updated_at DESC")
    render
  end
end
