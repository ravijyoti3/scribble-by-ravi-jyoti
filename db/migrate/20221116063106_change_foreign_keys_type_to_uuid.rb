# frozen_string_literal: true

class ChangeForeignKeysTypeToUuid < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :user_id, :integer
    remove_column :articles, :category_id, :integer
    remove_column :categories, :user_id, :integer
    remove_column :redirections, :organization_id, :integer
    remove_column :users, :organization_id, :integer

    add_column :articles, :user_id, :uuid, null: false
    add_column :articles, :category_id, :uuid, null: false
    add_column :categories, :user_id, :uuid, null: false
    add_column :redirections, :organization_id, :uuid, null: false
    add_column :users, :organization_id, :uuid, null: false
  end
end
