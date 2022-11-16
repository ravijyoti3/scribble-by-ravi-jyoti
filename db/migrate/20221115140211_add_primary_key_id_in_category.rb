# frozen_string_literal: true

class AddPrimaryKeyIdInCategory < ActiveRecord::Migration[6.1]
  def change
    execute "ALTER TABLE categories ADD PRIMARY KEY (id);"
  end
end
