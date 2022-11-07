# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :organization

  validates :from, presence: true, uniqueness: true
  validates :to, presence: true

  validate :to_and_from_not_equal, :check_redirection_loop
  validate :unique_to_and_from_combination

  private

    def to_and_from_not_equal
      if self.to == self.from
        errors.add(:base, "To and From cannot be equal")
      end
    end

    def check_redirection_loop
      if to_exist_in_from? && from_exist_in_to?
        errors.add(:base, "This redirection causes redirection loop")
      end
    end

    def unique_to_and_from_combination
      if Redirection.where(to: self.to, from: self.from).present?
        errors.add(:base, "This redirection already exist")
      end
    end

    def to_exist_in_from?
      Redirection.where(to: self.from).present?
    end

    def from_exist_in_to?
      Redirection.where(from: self.to).present?
    end
end
