import Dashboard from "components/Dashboard";
import Article from "components/Dashboard/Article";

export const ARTICLE_PATH = "/articles";
export const DASHBOARD_PATH = "/";

export const PRIVATE_ROUTES = [{ path: DASHBOARD_PATH, component: Dashboard }];

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLE_PATH,
    component: Article,
  },
];
