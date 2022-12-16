# frozen_string_literal: true

require "test_helper"

class ScheduleTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_not_publish_article_before_present_time
    @article.status = "draft"
    @article.save!
    schedule = Schedule.new(article_id: @article.id, publish_at: Time.zone.now - 1.day)
    assert_raises ActiveRecord::RecordInvalid do
      schedule.save!
    end
    assert_match t("schedule.before_present_time"), schedule.errors_to_sentence
  end

  def test_should_not_unpublish_article_before_present_time
    @article.status = "published"
    @article.save!
    schedule = Schedule.new(article_id: @article.id, unpublish_at: Time.zone.now - 1.day)
    assert_raises ActiveRecord::RecordInvalid do
      schedule.save!
    end
    assert_match t("schedule.before_present_time"), schedule.errors_to_sentence
  end

  def test_should_not_unpublish_article_before_publish_if_article_is_draft
    @article.status = "draft"
    @article.save!
    schedule = Schedule.new(article_id: @article.id, publish_at: Time.zone.now + 1.day, unpublish_at: Time.zone.now)
    assert_raises ActiveRecord::RecordInvalid do
      schedule.save!
    end
    assert_match t("schedule.before_publish"), schedule.errors_to_sentence
  end

  def test_should_not_publish_article_before_unpublish_if_article_is_published
    @article.status = "published"
    @article.save!
    schedule = Schedule.new(article_id: @article.id, unpublish_at: Time.zone.now + 1.day, publish_at: Time.zone.now)
    assert_raises ActiveRecord::RecordInvalid do
      schedule.save!
    end
    assert_match t("schedule.before_unpublish"), schedule.errors_to_sentence
  end
end
