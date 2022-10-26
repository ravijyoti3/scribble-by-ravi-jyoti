import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import redirectionsApi from "apis/redirections";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import Eui from "components/Eui/Main";
import "lib/dayjs"; //eslint-disable-line

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirectionsData, setRedirectionsData] = useState([]);

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setRedirectionsData(redirections);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
    fetchRedirections();
    registerIntercepts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {redirectionsData.map(redirection => (
          <Redirect
            exact
            from={redirection.from}
            key={redirection.id}
            to={{ pathname: redirection.to, state: { status: 301 } }}
          />
        ))}
        <Route path="/public">
          <Eui />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
