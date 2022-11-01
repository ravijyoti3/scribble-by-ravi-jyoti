# frozen_string_literal: true

class ArticleBulkUpdateService
  attr_reader :current_user, :id, :new_id

  def initialize(current_user, id, new_id)
    @_current_user = current_user
    @id = id
    @new_id = new_id
  end

  def bulk_update
    if @_current_user.categories.count == 1 && @_current_user.categories.first.name != "General"
      Category.new(name: "General", user_id: @_current_user.id).save!
      @new_id = @_current_user.categories.last.id
    elsif @_current_user.categories.count == 1 && @_current_user.categories.first.name == "General"
      return nil
    end

    @_current_user.articles.all.where(category_id: @id).update(category_id: @new_id)
    category_articles = @_current_user.articles.where(category_id: @id)
    category_articles.update(category_id: @new_id)
  end
end
