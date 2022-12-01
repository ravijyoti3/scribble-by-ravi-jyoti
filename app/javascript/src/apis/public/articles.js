import axios from "axios";

const fetch = searchQuery =>
  axios.get("/api/public/articles", { params: { search: searchQuery } });
const show = slug => axios.get(`/api/public/articles/${slug}`);

const articlesApi = {
  fetch,
  show,
};

export default articlesApi;
