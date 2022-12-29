# frozen_string_literal: true

class Api::Admin::UsersController < ApplicationController
  def index
    @user = current_user
  end
end
