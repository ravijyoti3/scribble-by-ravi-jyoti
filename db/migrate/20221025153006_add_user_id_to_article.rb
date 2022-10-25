# frozen_string_literal: true

class AddUserIdToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :user_id, :integer, null: false, default: 1
  end
end
