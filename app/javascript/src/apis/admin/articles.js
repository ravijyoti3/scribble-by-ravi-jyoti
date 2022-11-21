import axios from "axios";

const fetch = payload =>
  axios.get("api/admin/articles", {
    params: {
      categories: payload?.categories,
      status: payload?.status,
      search: payload?.search,
    },
  });
const create = payload =>
  axios.post("api/admin/articles", { article: payload });
const destroy = id => axios.delete(`api/admin/articles/${id}`);
const show = id => axios.get(`api/admin/articles/${id}`);
const update = ({ id, payload }) =>
  axios.put(`api/admin/articles/${id}`, payload);
const positionUpdate = payload =>
  axios.put("api/admin/articles/position_update", {
    id: payload.id,
    final_position: payload.finalPosition,
  });
const bulkUpdate = payload =>
  axios.put("api/admin/articles/bulk_update", {
    ids: payload.ids,
    category_id: payload.categoryId,
  });

const articlesApi = {
  fetch,
  create,
  destroy,
  show,
  update,
  positionUpdate,
  bulkUpdate,
};

export default articlesApi;
