# frozen_string_literal: true

class RemoveVisitFromArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :visit, :integer
  end
end
