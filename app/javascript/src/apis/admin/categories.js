import axios from "axios";

const fetch = () => axios.get("/api/admin/categories");
const create = payload => axios.post("api/admin/categories", payload);
const position_update = payload =>
  axios.put("api/admin/categories/position_update", payload);
const show = id => axios.get(`api/admin/categories/${id}`);
const destroy = payload =>
  axios.delete(`api/admin/categories/${payload.id}?new_id=${payload.newId}`);
const update = payload =>
  axios.put(`api/admin/categories/${payload.id}`, payload);
const categoriesApi = { fetch, create, position_update, show, destroy, update };

export default categoriesApi;
