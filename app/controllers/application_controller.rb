# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable

  private

    def load_current_organization!
      @current_organization = Organization.first
    end

    def current_user!
      current_organization = load_current_organization!
      @_current_user ||= @current_organization.users.first
    end
end
