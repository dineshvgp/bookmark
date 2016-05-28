import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import AppContainer from "./components/AppContainer";
import Home from "./components/Home";

/**
 * App routes goes here.
 * By default, Home page is routed.
 */
const routes = (
  <Router>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

export default routes;
