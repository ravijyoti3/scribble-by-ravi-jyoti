# frozen_string_literal: true

class AddArticleIdForeignKeyInSchedule < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :schedules, :articles, on_delete: :cascade
  end
end
