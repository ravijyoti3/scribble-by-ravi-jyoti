# frozen_string_literal: true

class CategoryDeletionService
  attr_reader :current_user, :id, :new_id

  def initialize(current_user, id, new_id)
    @current_user = current_user
    @id = id
    @new_id = new_id
  end

  def process
    if @current_user.categories.count == 1 && @current_user.categories.first.name != "General"
      Category.new(name: "General", user_id: @current_user.id).save!
      @new_id = @current_user.categories.last.id
    elsif @current_user.categories.count == 1 && @current_user.categories.first.name == "General"
      return nil
    end
    @current_user.articles.all.where(category_id: @id).update(category_id: @new_id)
    @current_user.categories.find(@id).destroy
  end
end
