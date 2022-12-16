# frozen_string_literal: true

require "test_helper"
class ArticleScheduleWorkerTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
    @time = Time.zone.now + 5.minutes
  end

  def test_should_publish_article_if_publish_at_present
    @schedule.update(publish_at: @time)
    travel_to @time + 1.minute
    ArticleScheduleWorker.perform_async
    assert_equal "published", @article.reload.status
  end

  def test_should_unpublish_article_if_unpublish_at_present
    @schedule.update(unpublish_at: @time)
    travel_to @time + 1.minute
    ArticleScheduleWorker.perform_async
    assert_equal "draft", @article.reload.status
  end
end
