# frozen_string_literal: true

class AddPostionToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :position, :integer, null: false
  end
end
