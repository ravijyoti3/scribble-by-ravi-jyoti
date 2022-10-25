# frozen_string_literal: true

class AddForiegnKeyCategoryIdToArticle < ActiveRecord::Migration[6.1]
  def change
    change_column_null :articles, :category_id, false
    add_foreign_key :articles, :categories, on_delete: :cascade
  end
end
