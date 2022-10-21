# frozen_string_literal: true

class AddIsSitePasswordProtected < ActiveRecord::Migration[6.1]
  def change
    add_column :sites, :password_protected, :boolean, default: false
  end
end
