import axios from "axios";

const fetch = () => axios.get("/public/categories");
const create = payload => axios.post("/admin/categories", payload);
const position_update = payload =>
  axios.put("/admin/categories/position_update", payload);
const show = id => axios.get(`/admin/categories/${id}`);
const destroy = payload =>
  axios.delete(`/admin/categories/${payload.id}?new_id=${payload.newId}`);
const update = payload => axios.put(`/admin/categories/${payload.id}`, payload);
const categoriesApi = { fetch, create, position_update, show, destroy, update };

export default categoriesApi;
