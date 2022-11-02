import axios from "axios";

const fetch = () => axios.get("/admin/redirections");
const create = payload => axios.post("/admin/redirections", payload);
const update = payload =>
  axios.put(`/admin/redirections/${payload.id}`, payload);
const destroy = id => axios.delete(`/admin/redirections/${id}`);
const redirectionsApi = { fetch, create, update, destroy };

export default redirectionsApi;
