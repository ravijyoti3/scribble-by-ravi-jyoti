# frozen_string_literal: true

class ChangeUserIdTypeToUuid < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :uuid, :uuid, default: "gen_random_uuid()", null: false

    remove_foreign_key :articles, :users
    remove_foreign_key :categories, :users

    change_table :users do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE users ADD PRIMARY KEY (id);"
  end
end
