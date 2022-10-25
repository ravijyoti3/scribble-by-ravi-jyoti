import axios from "axios";

const fetch = () => axios.get("/organizations");
const login = payload => axios.post("/organizations", payload);
const update = payload => axios.put(`/organizations/${payload.id}`, payload);
const show = id => axios.get(`/organizations/${id}`);

const organizationsApi = { fetch, login, update, show };

export default organizationsApi;
