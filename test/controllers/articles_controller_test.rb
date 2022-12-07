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

  def test_should_update_article_positions
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    third_article = create(:article, category: @category, user: @user)
    last_position = third_article.position
    put position_update_api_admin_articles_path, params: { id: first_article.id, final_position: last_position + 1 },
      as: :json
    assert_equal last_position + 1, first_article.reload.position
  end

  def test_should_bulk_update_article_category_id
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    third_article = create(:article, category: @category, user: @user)
    put bulk_update_api_admin_articles_path,
      params: { category_id: @category.id, ids: [first_article.id, second_article.id, third_article.id] },
      as: :json
    assert_equal @category.id, first_article.reload.category_id
  end

  def test_should_increment_count_of_article_visit
    first_article = create(:article, category: @category, user: @user, status: "published")
    get api_public_article_path(first_article.slug), as: :json
    assert_response :success
    assert_equal 1, first_article.reload.visits.reduce(0) { |sum, visit| sum + visit.visit }
  end

  def test_should_show_article_details
    first_article = create(:article, category: @category, user: @user, status: "published")
    get api_admin_article_path(first_article.id), as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal first_article.title, response_json["title"]
  end

  def test_should_create_visit_and_increment_visit_if_already_exist
    first_article = create(:article, category: @category, user: @user, status: "published")
    get api_public_article_path(first_article.slug), as: :json
    assert_response :success
    assert_equal 1, first_article.reload.visits.reduce(0) { |sum, visit| sum + visit.visit }
    get api_public_article_path(first_article.slug), as: :json
    assert_response :success
    assert_equal 2, first_article.reload.visits.reduce(0) { |sum, visit| sum + visit.visit }
  end

  def test_should_list_searched_article_public
    first_article = create(:article, category: @category, user: @user, status: "published")
    get api_public_articles_path, params: { search: first_article.title }, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal first_article.title, response_json["articles"].first["title"]
  end
end
