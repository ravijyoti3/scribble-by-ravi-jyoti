# frozen_string_literal: true

class EnablePgCryptoExtension < ActiveRecord::Migration[5.2]
  def change
    enable_extension "pgcrypto"
  end
end
