# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirections!, only: %i[update destroy]

  def index
    @redirections = Redirection.all
    render
  end

  def create
    redirection = Redirection.new(redirection_params)
    if redirection.save!
      render status: :created, json: { notice: "Redirection was successfully created" }
    end
  end

  def update
    @redirection.update!(redirection_params)
    render status: :created, json: { notice: "Redirection was successfully updated" }
  end

  def destroy
    @redirection.destroy!
    render status: :created, json: { notice: "Redirection was successfully deleted" }
  end

  private

    def load_redirections!
      @redirection = Redirection.find_by!(id: params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end
end
