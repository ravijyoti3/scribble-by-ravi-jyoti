# frozen_string_literal: true

class RenameSiteToOrganisation < ActiveRecord::Migration[6.1]
  def change
    rename_table :sites, :organisations
  end
end
