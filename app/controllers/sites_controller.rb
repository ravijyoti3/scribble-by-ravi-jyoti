# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :set_site, only: %i[show update]

  def show
    render
  end

  def update
    @site.name = params[:name]
    @site.password = params[:password]
    @site.password_protected = params[:password_protected]
    @site.save!
    render status: :ok, json: { notice: "Site was successfully updated" }
  end

  private

    # TODO: Remove password_digest
    def site_params
      params.require(:site).permit(:name, :password)
    end

    def set_site
      @site = Site.first
    end
end
