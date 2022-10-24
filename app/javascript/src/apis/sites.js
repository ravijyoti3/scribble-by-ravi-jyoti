import axios from "axios";

const fetch = () => axios.get("/sites");
const login = payload => axios.post("/sites", payload);
const update = payload => axios.put(`/sites/${payload.id}`, payload);
const show = id => axios.get(`/sites/${id}`);

const sitesApi = { fetch, login, update, show };

export default sitesApi;
