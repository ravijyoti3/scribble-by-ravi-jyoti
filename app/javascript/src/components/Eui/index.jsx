import React, { useState } from "react";

import { useQuery } from "react-query";
import { Route, Switch } from "react-router-dom";

import organizationApi from "apis/admin/organization";
import PrivateRoute from "components/Common/PrivateRoute";

import Article from "./Article";
import Header from "./Header";
import Login from "./Login";
import SearchModal from "./SearchModal";

import { PUBLIC_PATH, LOGIN_PATH } from "../routeConstants";

const Eui = () => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const [isPasswordValidated, setIsPasswordValidated] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const { data: organizationData } = useQuery(
    "fetchOrganizationDataAndCheckPasswordValidation",
    async () => {
      const { data } = await organizationApi.show();

      return data;
    },
    {
      onSuccess: data => {
        setIsPasswordValidated(
          authToken?.token === data.authentication_token ||
            !data.password_protected
        );
      },
      onError: error => logger.error(error),
    }
  );

  return (
    <>
      <Header
        setShowSearchModal={setShowSearchModal}
        showSearchModal={showSearchModal}
        title={organizationData?.name}
      />
      <Switch>
        <Route exact path={LOGIN_PATH}>
          <Login
            organizationData={organizationData}
            setIsPasswordValidated={setIsPasswordValidated}
          />
        </Route>
        <PrivateRoute
          component={Article}
          condition={isPasswordValidated}
          path={PUBLIC_PATH}
          redirectRoute={LOGIN_PATH}
        />
      </Switch>
      {showSearchModal && (
        <SearchModal setShowSearchModal={setShowSearchModal} />
      )}
    </>
  );
};

export default Eui;
