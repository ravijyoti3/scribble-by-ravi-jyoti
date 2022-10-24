import React, { useEffect, useState } from "react";

import { Route, Switch } from "react-router-dom";

import sitesApi from "apis/sites";
import PrivateRoute from "components/Common/PrivateRoute";

import Article from "./Article";
import Header from "./Header";
import Login from "./Login";

import { PUBLIC_PATH, LOGIN_PATH } from "../routeConstants";

const Main = () => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const [siteData, setSiteData] = useState({});
  const [isPasswordValidated, setIsPasswordValidated] = useState(true);

  const fetchSiteDataAndCheckPasswordValidation = async () => {
    try {
      const { data } = await sitesApi.show();
      setSiteData(data);
      setIsPasswordValidated(
        (authToken && authToken.token) || !data.password_protected
      );
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchSiteDataAndCheckPasswordValidation();
  }, []);

  return (
    <>
      <Header title={siteData.name} />
      <Switch>
        <Route exact path={LOGIN_PATH}>
          <Login
            setIsPasswordValidated={setIsPasswordValidated}
            siteData={siteData}
          />
        </Route>
        <PrivateRoute
          component={Article}
          condition={isPasswordValidated}
          path={PUBLIC_PATH}
          redirectRoute={LOGIN_PATH}
        />
      </Switch>
    </>
  );
};

export default Main;
