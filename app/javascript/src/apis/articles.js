import axios from "axios";

const fetch = payload =>
  axios.get(
    `/articles?categories=${payload.categories}&status=${payload.status}&search=${payload.search}`
  );
const create = payload => axios.post("/articles", payload);
const bulkUpdate = payload => axios.put("/articles/bulk_update", payload);
const destroy = id => axios.delete(`/articles/${id}`);
const show = id => axios.get(`/articles/${id}`);
const update = ({ id, payload }) => axios.put(`/articles/${id}`, payload);
const articlesApi = { fetch, create, bulkUpdate, destroy, show, update };

export default articlesApi;
