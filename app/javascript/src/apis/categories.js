import axios from "axios";

const fetch = () => axios.get("/categories");
const create = payload => axios.post("/categories", payload);
const position_update = payload =>
  axios.put("/categories/position_update", payload);
const show = id => axios.get(`/categories/${id}`);
const destroy = id => axios.delete(`/categories/${id}`);
const update = payload => axios.put(`/categories/${payload.id}`, payload);
const categoriesApi = { fetch, create, position_update, show, destroy, update };

export default categoriesApi;
