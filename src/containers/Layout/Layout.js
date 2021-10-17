import React from "react";
import Header from "../../components/Header/Header";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions";

const Layout = (props) => {
  React.useEffect(() => {
    props.onTryAutoLogin();
  }, []);

  let redirect = null;

  if (props.token) {
    redirect = <Redirect to="/" />;
  } else {
    redirect = <Redirect to="/auth" />;
  }

  return (
    <>
      {redirect}
      {props.token ? <Header email={props.email} /> : null}
      <main>{props.children}</main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    email: state.auth.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.tryAutoLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
