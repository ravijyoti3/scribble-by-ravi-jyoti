# frozen_string_literal: true

class SitesController < ApplicationController
  def index
    @sites = Site.all
    render
  end

  def create
    site = Site.new(site_params)
    site.save!
    render status: :ok, json: { notice: "Site was successfully created" }
  end

  def update
    site = Site.first
    site.update(site_params)
    render status: :ok, json: { notice: "Site was successfully updated" }
  end
end
