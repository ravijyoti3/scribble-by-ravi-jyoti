# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show update create]

  def show
    render
  end

  def update
    @organization.name = params[:name]
    @organization.password = params[:password]
    @organization.password_protected = params[:password_protected]
    @organization.save!
    render status: :ok, json: { notice: "Organization was successfully updated" }
  end

  def create
    unless @organization.authenticate(params[:password])
      render status: :unauthorized, json: { error: "Invalid password" }
    end
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password)
    end

    def set_organization
      @organization = Organization.first
    end
end
