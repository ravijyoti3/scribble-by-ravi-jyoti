import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import NavBar from "components/Common/NavBar";
import {
  DASHBOARD_PATH,
  ARTICLE_PATH,
  DASHBOARD_ROUTES,
} from "components/routeConstants";

const Dashboard = () => (
  <>
    <NavBar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from={DASHBOARD_PATH} to={ARTICLE_PATH} />
    </Switch>
  </>
);

export default Dashboard;
