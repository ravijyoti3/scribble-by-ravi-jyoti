import axios from "axios";

const login = payload => axios.post("api/admin/organization", payload);
const update = payload =>
  axios.put("api/admin/organization", { organization: payload });
const show = () => axios.get("api/admin/organization");

const organizationApi = { login, update, show };

export default organizationApi;
