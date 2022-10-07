import React from "react";

import { Route, Switch } from "react-router-dom";

import Article from "./Article";
import Header from "./Header";
import Login from "./Login";

import { PUBLIC_PATH } from "../routeConstants";

const Main = () => {
  const isLoggedIn = true;
  const havePassword = false;

  return (
    <>
      <Header />
      <Switch>
        {(isLoggedIn || !havePassword) && (
          <Route exact component={Article} path={PUBLIC_PATH} />
        )}
        <Route exact component={Login} path={PUBLIC_PATH} />
      </Switch>
    </>
  );
};

export default Main;
