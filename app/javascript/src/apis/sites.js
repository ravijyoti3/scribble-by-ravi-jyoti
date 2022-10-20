import axios from "axios";

const fetch = () => axios.get("/sites");
const create = payload => axios.post("/sites", payload);
const update = payload => axios.put(`/sites/${payload.id}`, payload);

const sitesApi = { fetch, create, update };

export default sitesApi;
