import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import Eui from "components/Eui";
import "lib/dayjs"; //eslint-disable-line

const App = () => {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setPageLoading);
    registerIntercepts();
  }, []);

  if (pageLoading) {
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
