import Analytics from "components/Dashboard/Analytics";
import Article from "components/Dashboard/Article";
import CreateArticle from "components/Dashboard/Article/Create";
import Settings from "components/Dashboard/Settings";

export const ARTICLE_PATH = "/articles";
export const DASHBOARD_PATH = "/";
export const NEW_ARTICLE_PATH = "/articles/create";
export const EDIT_ARTICLE_PATH = "/articles/:id/edit";
export const SETTINGS_PATH = "/settings";
export const ANALYTICS_PATH = "/analytics";
export const PUBLIC_PATH = "/public";
export const LOGIN_PATH = "/public/login";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLE_PATH,
    component: Article,
  },
  {
    path: NEW_ARTICLE_PATH,
    component: CreateArticle,
  },
  {
    path: EDIT_ARTICLE_PATH,
    component: CreateArticle,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
  {
    path: ANALYTICS_PATH,
    component: Analytics,
  },
];
