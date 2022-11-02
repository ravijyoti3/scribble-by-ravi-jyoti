# frozen_string_literal: true

class Public::ArticlesController < ApplicationController
  before_action :current_user!, only: %i[show_by_slug]

  def show_by_slug
    @article = @_current_user.articles.find_by!(slug: params[:slug])
    render
  end
end
