import React from "react";

import { Route, Switch } from "react-router-dom";

import PrivateRoute from "components/Common/PrivateRoute";

import Article from "./Article";
import Header from "./Header";
import Login from "./Login";

import { PUBLIC_PATH, LOGIN_PATH } from "../routeConstants";

const Main = () => {
  const isLoggedIn = false;
  const havePassword = true;

  return (
    <>
      <Header />
      <Switch>
        <Route exact component={Login} path={LOGIN_PATH} />
        <PrivateRoute
          component={Article}
          condition={isLoggedIn || !havePassword}
          path={PUBLIC_PATH}
          redirectRoute={LOGIN_PATH}
        />
      </Switch>
    </>
  );
};

export default Main;
