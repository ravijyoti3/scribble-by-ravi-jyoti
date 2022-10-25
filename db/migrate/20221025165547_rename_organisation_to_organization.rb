# frozen_string_literal: true

class RenameOrganisationToOrganization < ActiveRecord::Migration[6.1]
  def change
    rename_table :organisations, :organizations
  end
end
