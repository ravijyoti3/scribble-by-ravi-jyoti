import React, { useEffect } from "react";

import { useMutation } from "react-query";
import { matchPath } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import usersApi from "apis/admin/users";
import NavBar from "components/Common/NavBar";
import UrlNotFound from "components/Common/UrlNotFound";
import {
  DASHBOARD_PATH,
  ARTICLE_PATH,
  DASHBOARD_ROUTES,
} from "components/routeConstants";

const Dashboard = () => {
  const isValidRoute = matchPath(window.location.pathname, {
    path: [...DASHBOARD_ROUTES.map(route => route.path), "/"],
    exact: true,
    strict: false,
  });

  const { mutate: fetchCurrentUser } = useMutation(
    async () => {
      const { data } = await usersApi.getUser();

      return data;
    },
    {
      onSuccess: data => localStorage.setItem("currentUser", data.email),
    }
  );

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <>
      {isValidRoute && <NavBar />}
      <Switch>
        {DASHBOARD_ROUTES.map(({ path, component }) => (
          <Route exact component={component} key={path} path={path} />
        ))}
        <Redirect exact from={DASHBOARD_PATH} to={ARTICLE_PATH} />
        <Route component={UrlNotFound} path="*" />
      </Switch>
    </>
  );
};

export default Dashboard;
