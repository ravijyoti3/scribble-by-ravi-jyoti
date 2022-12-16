# frozen_string_literal: true

class Api::Admin::SchedulesController < ApplicationController
  def create
    Schedule.create!(schedule_params)
    respond_with_success t("successfully_created", entity: "Schedule")
  end

  def update
    Schedule.find_by(article_id: params[:article_id]).update!(schedule_params)
    respond_with_success t("successfully_updated", entity: "Schedule")
  end

  private

    def schedule_params
      params.require(:schedule).permit(:publish_at, :unpublish_at, :article_id)
    end
end
