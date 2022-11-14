# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :organization

  validates :from, presence: true, uniqueness: true
  validates :to, presence: true

  validate :to_and_from_not_equal
  validate :unique_to_and_from_combination

  private

    def to_and_from_not_equal
      if self.to == self.from
        errors.add(:base, t("redirection.to_and_from_not_equal"))
      end
    end

    def check_redirection_loop
      new_path = to
      while (redirection = Redirection.find_by(from: new_path))
        if redirection.to == from
          errors.add(:base, t("redirection.redirection_loop"))
          break
        end
        new_path = redirection.to
      end
    end

    def unique_to_and_from_combination
      if Redirection.where(to: self.to, from: self.from).present?
        errors.add(:base, t("redirection.unique_to_and_from_combination"))
      end
    end
end
