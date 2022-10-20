import axios from "axios";

const fetch = () => axios.get("/articles");
const create = payload => axios.post("/articles", payload);
const bulk_update = payload => axios.put("/articles/bulk_update", payload);
const destroy = id => axios.delete(`/articles/${id}`);
const articlesApi = { fetch, create, bulk_update, destroy };

export default articlesApi;
