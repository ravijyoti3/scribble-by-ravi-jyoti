# frozen_string_literal: true

class RemoveNotNullPositionArticle < ActiveRecord::Migration[6.1]
  def change
    change_column_null :articles, :position, true
  end
end
