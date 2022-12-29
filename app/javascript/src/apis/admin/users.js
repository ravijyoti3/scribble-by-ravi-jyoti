import axios from "axios";

const getUser = () => axios.get("/api/admin/users");

const usersApi = { getUser };
export default usersApi;
