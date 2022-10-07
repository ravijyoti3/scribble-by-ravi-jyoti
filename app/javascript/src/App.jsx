import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import Eui from "components/Eui/Main";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
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
