import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import withStyles from "isomorphic-style-loader/withStyles";

// @ts-ignore
import styles from "@Components/sass/index";
import Routes from "./routes";

export function withRouterWorkaround(Inner) {
  const Wrapped = (props) => <Inner {...props} />;
  Wrapped.displayName = `WithRouterWorkaround(${Inner.displayName || Inner.name || "?"})`;
  return withRouter(Wrapped);
}

class App extends React.Component {
  render() {
    console.log("App*** ", this.props);
    return (
      <Switch>
        {Routes.map((route, i) => (
          <Route
            key={route.path}
            path={route.path}
            {...this.props}
            // component={route.component}
            exact={route.exact !== false}
            strict
          >
            {withRouterWorkaround(route.component)}
            {/* {route.component} */}
          </Route>
        ))}
      </Switch>
    );
  }
}

const AppWithStyles = withStyles(styles)(App);

export default AppWithStyles;
// export default withRouter(AppWithStyles);
