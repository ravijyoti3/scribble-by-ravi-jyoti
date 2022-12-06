# frozen_string_literal: true

class CreateVisitTable < ActiveRecord::Migration[6.1]
  def change
    create_table :visits, id: :uuid do |t|
      t.integer :visit, default: 0
      t.uuid :article_id, null: false
      t.datetime :visited_at, null: false
      t.timestamps
    end
  end
end
