 import React from "react";
 import {Redirect} from "react-router-dom";
 import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});


export const withRedirect = (Component) => {
  class RedirectContainer extends React.Component {
      render() {
          if (!this.props.isAuth) return <Redirect to='/login' />;
          return (
              <Component {...this.props}/>
          );
      }
  }

  let ConnectRedirectContainer = connect (mapStateToProps)(RedirectContainer);

  return ConnectRedirectContainer;
};