import axios from "axios";

const fetch = payload =>
  axios.get(
    `/admin/articles?categories=${payload.categories}&status=${payload.status}&search=${payload.search}`
  );
const create = payload => axios.post("/admin/articles", payload);
const bulkUpdate = payload => axios.put("/admin/articles/bulk_update", payload);
const destroy = id => axios.delete(`/admin/articles/${id}`);
const show = id => axios.get(`/admin/articles/${id}`);
const show_by_slug = slug => axios.get(`/public/articles/${slug}/show_by_slug`);
const update = ({ id, payload }) => axios.put(`/admin/articles/${id}`, payload);
const articlesApi = {
  fetch,
  create,
  bulkUpdate,
  destroy,
  show,
  update,
  show_by_slug,
};

export default articlesApi;
