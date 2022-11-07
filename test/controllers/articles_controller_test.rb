# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_create_article
    post api_admin_articles_path,
      params: {
        article: {
          title: @article.title, category_id: @category.id, user_id: @user.id,
          body: @article.body
        }
      }, as: :json
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete api_admin_article_path(@article.id), as: :json
    end
    assert_response :ok
  end

  def test_user_can_update_any_article_field
    article_id = @article.id
    article_title = @article.title

    post api_admin_articles_path,
      params: {
        article: {
          title: @article.title, category_id: @category.id, user_id: @user.id,
          body: @article.body
        }
      }, as: :json
    assert_response :success

    @article.reload

    put api_admin_article_path(article_id),
      params: {
        article: {
          title: @article.title, category_id: @category.id, user_id: @user.id,
          body: @article.body
        }
      }, as: :json
    assert_response :success

    assert_equal article_title, @article.title
  end

  def test_should_show_all_articles
    get api_admin_articles_path, as: :json
    assert_response :success
    response_json = response.parsed_body
    all_articles = @user.articles.count
    assert_equal all_articles, response_json["articles"].count
  end
end
