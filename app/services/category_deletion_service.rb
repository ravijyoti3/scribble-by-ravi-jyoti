# frozen_string_literal: true

class CategoryDeletionService
  attr_accessor :current_user, :id, :new_id

  def initialize(current_user, id, new_id)
    @current_user = current_user
    @id = id
    @new_id = new_id
  end

  def process
    if current_user.categories.count == 1 && current_user.categories.first.name != "General"
      new_category = current_user.categories.create!(name: "General")
      self.new_id = new_category.id
    elsif current_user.categories.count == 1 && current_user.categories.first.name == "General"
      return nil
    end
    current_user.articles.where(category_id: id).update(category_id: new_id)
    current_user.categories.find(id).destroy!
  end
end
