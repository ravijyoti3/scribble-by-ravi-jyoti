import Article from "components/Dashboard/Article";
import CreateArticle from "components/Dashboard/Article/Create";

export const ARTICLE_PATH = "/articles";
export const DASHBOARD_PATH = "/";
export const NEW_ARTICLE_PATH = "/articles/create";
export const SETTING_PATH = "/setting";
export const GENERAL_SETTING_PATH = "/setting/general";
export const REDIRECTIONS_SETTING_PATH = "/setting/redirections";
export const CATEGORIES_SETTING_PATH = "/setting/categories";

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
