# frozen_string_literal: true

class ArticleReportWorker
  include Sidekiq::Worker

  def perform(user_id, report_path)
    articles = Article.accessible_to(user_id)
    content = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "api/admin/articles/report/download",
      layout: "pdf"
    )
    pdf_blob = WickedPdf.new.pdf_from_string content
    current_user = User.find_by!(id: user_id)
    if current_user.report.attached?
      current_user.report.purge_later
    end
    current_user.report.attach(
      io: StringIO.new(pdf_blob), filename: "report.pdf",
      content_type: "application/pdf")
    current_user.save
  end
end
