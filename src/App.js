import React from "react";
import Layout from "./containers/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

const App = (props) => {
  const authenticated = (
    <Switch>
      <Route path="/" component={Home} exact />
      <Redirect to="/" />
    </Switch>
  );

  const unauthenticated = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );

  return (
    <div>
      <Layout>{props.token ? authenticated : unauthenticated}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(App);
