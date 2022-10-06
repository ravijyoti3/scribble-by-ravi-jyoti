import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import {
  SETTING_PATH,
  CATEGORIES_SETTING_PATH,
  REDIRECTIONS_SETTING_PATH,
  GENERAL_SETTING_PATH,
} from "components/routeConstants";

import Categories from "./Categories";
import General from "./General";
import LeftMenuBar from "./LeftMenuBar";
import Redirections from "./Redirections";

const index = () => (
  <div className="flex">
    <LeftMenuBar className="px-5" />
    <Switch className="">
      <Route path={GENERAL_SETTING_PATH}>
        <General />
      </Route>
      <Route path={REDIRECTIONS_SETTING_PATH}>
        <Redirections />
      </Route>
      <Route path={CATEGORIES_SETTING_PATH}>
        <Categories />
      </Route>
      <Redirect from={SETTING_PATH} to={GENERAL_SETTING_PATH} />
    </Switch>
  </div>
);

export default index;
