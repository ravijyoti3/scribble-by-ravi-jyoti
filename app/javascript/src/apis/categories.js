import axios from "axios";

const fetch = () => axios.get("/categories");
const create = payload => axios.post("/categories", payload);
const position_update = payload =>
  axios.put("/categories/position_update", payload);
const categoriesApi = { fetch, create, position_update };

export default categoriesApi;
