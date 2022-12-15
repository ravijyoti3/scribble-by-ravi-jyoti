import axios from "axios";

const show = id => axios.get(`api/admin/schedules/${id}`);
const create = payload =>
  axios.post("api/admin/schedules", {
    schedule: {
      article_id: payload.articleId,
      publish_at: payload.publishAt,
      unpublish_at: payload.unpublishAt,
    },
  });
const update = payload =>
  axios.put(`api/admin/schedules/${payload.articleId}`, {
    schedule: {
      article_id: payload.articleId,
      publish_at: payload.publishAt,
      unpublish_at: payload.unpublishAt,
    },
  });

const schedulesApi = { show, create, update };

export default schedulesApi;
