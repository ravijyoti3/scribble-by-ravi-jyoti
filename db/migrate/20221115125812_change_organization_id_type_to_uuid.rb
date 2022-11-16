# frozen_string_literal: true

class ChangeOrganizationIdTypeToUuid < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :uuid, :uuid, default: "gen_random_uuid()", null: false

    remove_foreign_key :redirections, :organizations
    remove_foreign_key :users, :organizations

    change_table :organizations do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE organizations ADD PRIMARY KEY (id);"
  end
end
