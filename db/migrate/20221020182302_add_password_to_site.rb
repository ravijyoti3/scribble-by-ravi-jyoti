# frozen_string_literal: true

class AddPasswordToSite < ActiveRecord::Migration[6.1]
  def change
    add_column :sites, :password_digest, :string
  end
end
