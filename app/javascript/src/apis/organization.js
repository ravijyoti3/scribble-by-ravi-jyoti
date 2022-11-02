import axios from "axios";

const login = payload => axios.post("/admin/organization", payload);
const update = payload => axios.put("/admin/organization", payload);
const show = () => axios.get("/admin/organization");

const organizationApi = { login, update, show };

export default organizationApi;
