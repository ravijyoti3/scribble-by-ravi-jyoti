# frozen_string_literal: true

class AddSiteColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :sites, :name, :string
  end
end
