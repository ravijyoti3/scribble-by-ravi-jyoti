# frozen_string_literal: true

require "test_helper"

class SchedulesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_create_schedule
    post api_admin_schedules_path,
      params: { schedule: { article_id: @article.id, publish_at: Time.zone.now + 1.day } }, as: :json
    assert_response :success
  end

  def test_should_update_schedule
    @schedule = Schedule.create!(article_id: @article.id, publish_at: Time.zone.now + 1.day)
    put api_admin_schedule_path(@article.id),
      params: { schedule: { article_id: @article.id, publish_at: nil } }, as: :json
    assert_response :success
    assert_equal t("successfully_updated", entity: "Schedule"), response.parsed_body["notice"]
  end
end
