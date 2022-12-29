# frozen_string_literal: true

class ArticleReportWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  def perform(user_id)
    ActionCable.server.broadcast(user_id, { message: t("report.render"), progress: 25 })
    articles = Article.accessible_to(user_id).where(status: "published")
    html_report = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "api/admin/articles/report/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: t("report.generate"), progress: 50 })
    pdf_report = WickedPdf.new.pdf_from_string html_report
    current_user = User.find(user_id)
    if current_user.report.attached?
      current_user.report.purge_later
    end
    ActionCable.server.broadcast(user_id, { message: t("report.upload"), progress: 75 })
    current_user.report.attach(
      io: StringIO.new(pdf_report), filename: "scribble_article_report.pdf",
      content_type: "application/pdf")
    current_user.save
    ActionCable.server.broadcast(user_id, { message: t("report.attach"), progress: 100 })
  end
end
