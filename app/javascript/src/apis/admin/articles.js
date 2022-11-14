import axios from "axios";

const fetch = payload =>
  axios.get("api/admin/articles?categories", {
    params: {
      categories: payload.categories,
      status: payload.status,
      search: payload.search,
    },
  });
const create = payload => axios.post("api/admin/articles", payload);
const destroy = id => axios.delete(`api/admin/articles/${id}`);
const show = id => axios.get(`api/admin/articles/${id}`);
const update = ({ id, payload }) =>
  axios.put(`api/admin/articles/${id}`, payload);

const articlesApi = {
  fetch,
  create,
  destroy,
  show,
  update,
};

export default articlesApi;
