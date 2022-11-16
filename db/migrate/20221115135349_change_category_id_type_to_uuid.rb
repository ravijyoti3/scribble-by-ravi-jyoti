# frozen_string_literal: true

class ChangeCategoryIdTypeToUuid < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :uuid, :uuid, default: "gen_random_uuid()", null: false

    remove_foreign_key :articles, :categories

    change_table :categories do |t|
      t.remove :id
      t.rename :uuid, :id
    end
end
end
