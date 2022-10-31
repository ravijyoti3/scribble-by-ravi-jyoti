# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show update create]

  def show
    @organization
    render
  end

  def update
    @organization.name = params[:name]
    @organization.password_protected = params[:password_protected]
    @organization.password = params[:password]
    @organization.save!
    respond_with_success(t("successfully_updated", entity: Organization))
  end

  def create
    unless @organization.authenticate(params[:password])
      respond_with_error(t("organization.incorrect_credential"), :unauthorized)
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
