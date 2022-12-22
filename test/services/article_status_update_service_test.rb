# frozen_string_literal: true

require "test_helper"

class ArticleStatusUpdateServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
    @time = Time.zone.now + 5.minutes
  end

  def test_should_publish_article_later
    @article.update(status: "draft")
    @schedule.update(publish_at: @time)
    travel_to @time + 1.minute
    ArticleStatusUpdateService.new().process
    assert_equal "published", @article.reload.status
  end

  def test_should_unpublish_article_later
    @article.update(status: "published")
    @schedule.update(unpublish_at: @time)
    travel_to @time + 1.minute
    ArticleStatusUpdateService.new().process
    assert_equal "draft", @article.reload.status
  end
end
