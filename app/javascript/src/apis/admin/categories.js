import axios from "axios";

const fetch = () => axios.get("/api/admin/categories");
const create = payload => axios.post("api/admin/categories", payload);
const positionUpdate = payload =>
  axios.put("api/admin/categories/position_update", {
    id: payload.id,
    final_position: payload.finalPosition,
  });
const show = id => axios.get(`api/admin/categories/${id}`);
const destroy = payload =>
  axios.delete(`api/admin/categories/${payload.id}`, {
    params: {
      new_id: payload.newId,
    },
  });
const update = payload =>
  axios.put(`api/admin/categories/${payload.id}`, payload);

const categoriesApi = { fetch, create, positionUpdate, show, destroy, update };

export default categoriesApi;
