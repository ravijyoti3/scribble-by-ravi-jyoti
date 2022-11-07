import axios from "axios";

const showBySlug = slug =>
  axios.get(`/api/public/articles/${slug}/show_by_slug`);
const articlesApi = {
  showBySlug,
};

export default articlesApi;
