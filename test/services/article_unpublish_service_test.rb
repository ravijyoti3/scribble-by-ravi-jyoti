# frozen_string_literal: true

require "test_helper"

class ArticleUnpublishServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
    @time = Time.zone.now + 5.minutes
  end

  def test_should_unpublish_article_later
    @article.update(status: "published")
    @schedule.update(unpublish_at: @time)
    travel_to @time + 1.minute
    ArticleUnpublishService.new(@article).process
    assert_equal "draft", @article.reload.status
  end
end
