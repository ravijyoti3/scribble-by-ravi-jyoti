# frozen_string_literal: true

class ChangeArticleColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :body, :text, null: false
    add_column :articles, :status, :integer, default: 0
  end
end
