# frozen_string_literal: true

class AddForeignKeyArticleIdInVisits < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :visits, :articles, on_delete: :cascade
  end
end
