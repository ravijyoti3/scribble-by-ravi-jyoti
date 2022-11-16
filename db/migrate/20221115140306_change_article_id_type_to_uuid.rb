# frozen_string_literal: true

class ChangeArticleIdTypeToUuid < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :uuid, :uuid, default: "gen_random_uuid()", null: false

    change_table :articles do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE articles ADD PRIMARY KEY (id);"
  end
end
