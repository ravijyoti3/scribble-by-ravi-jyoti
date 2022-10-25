# frozen_string_literal: true

class AddUserIdToCategory < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :user_id, :integer, null: false, default: 1
  end
end
