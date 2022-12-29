# frozen_string_literal: true

require "test_helper"

class ArticleReportWorkerTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
    @time = Time.zone.now + 5.minutes
  end

  def test_should_generate_report_if_no_report_is_attached
    ArticleReportWorker.perform_async(@user.id, @user.email)
    assert @user.report.attached?
  end

  def test_should_update_report_if_report_is_attached
    ArticleReportWorker.perform_async(@user.id, @user.email)
    report_id = @user.report.id
    ArticleReportWorker.perform_async(@user.id, @user.email)
    assert @user.report.attached?
    assert_not_equal @user.reload.report.id, report_id
  end
end
