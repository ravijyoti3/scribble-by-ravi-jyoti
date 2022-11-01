# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :load_current_organization!, only: %i[show update create]

  def show
    render
  end

  def update
    @current_organization.name = params[:name]
    @current_organization.password_protected = params[:password_protected]
    @current_organization.password = params[:password]
    @current_organization.save!
    respond_with_success(t("successfully_updated", entity: Organization))
  end

  def create
    unless @current_organization.authenticate(params[:password])
      respond_with_error(t("organization.incorrect_credential"), :unauthorized)
    end
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password)
    end
end
