# frozen_string_literal: true

class ArticlesCategoryUpdationService
  attr_accessor :current_user, :article_ids, :new_category_id

  def initialize(current_user, article_ids, new_category_id)
    @current_user = current_user
    @article_ids = article_ids
    @new_category_id = new_category_id
  end

  def process
    article_ids.each do |id|
      current_user.articles.find(id).remove_from_list
    end
    current_user.articles.where(id: article_ids).update(category_id: new_category_id)
  end
end
