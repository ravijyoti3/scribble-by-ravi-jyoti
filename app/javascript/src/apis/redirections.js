import axios from "axios";

const fetch = () => axios.get("/redirections");
const create = payload => axios.post("/redirections", payload);
const update = payload => axios.put(`/redirections/${payload.id}`, payload);
const destroy = id => axios.delete(`/redirections/${id}`);
const redirectionsApi = { fetch, create, update, destroy };

export default redirectionsApi;
