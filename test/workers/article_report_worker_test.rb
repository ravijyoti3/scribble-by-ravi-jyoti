# frozen_string_literal: true

require "test_helper"

class ArticleReportWorkerTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_should_generate_report_if_no_report_is_attached
    ArticleReportWorker.perform_async(@user.id)
    assert @user.report.attached?
  end

  def test_should_update_report_if_report_is_attached
    ArticleReportWorker.perform_async(@user.id)
    report_id = @user.report.id
    ArticleReportWorker.perform_async(@user.id)
    assert @user.report.attached?
    assert_not_equal @user.reload.report.id, report_id
  end
end
