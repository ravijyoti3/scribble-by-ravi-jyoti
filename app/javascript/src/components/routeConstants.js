import Article from "components/Dashboard/Article";
import CreateArticle from "components/Dashboard/Article/Create";

export const ARTICLE_PATH = "/articles";
export const DASHBOARD_PATH = "/";
export const NEW_ARTICLE_PATH = "/articles/create";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLE_PATH,
    component: Article,
  },
  {
    path: NEW_ARTICLE_PATH,
    component: CreateArticle,
  },
];
