# frozen_string_literal: true

class MakePositionNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :categories, :position, false
  end
end
