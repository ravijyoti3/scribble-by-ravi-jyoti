# frozen_string_literal: true

class AddRedirectionColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :redirections, :from, :string
    add_column :redirections, :to, :string
  end
end
