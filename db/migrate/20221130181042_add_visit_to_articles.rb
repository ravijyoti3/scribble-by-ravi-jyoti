# frozen_string_literal: true

class AddVisitToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :visit, :integer, default: 0
  end
end
