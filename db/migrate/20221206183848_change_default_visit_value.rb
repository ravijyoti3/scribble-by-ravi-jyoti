# frozen_string_literal: true

class ChangeDefaultVisitValue < ActiveRecord::Migration[6.1]
  def change
    change_column_default :visits, :visit, from: 0, to: 1
  end
end
