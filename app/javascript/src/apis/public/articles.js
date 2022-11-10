import axios from "axios";

const show = slug => axios.get(`/api/public/articles/${slug}`);

const articlesApi = {
  show,
};

export default articlesApi;
