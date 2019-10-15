import React from "react";
// import * as $ from "jquery";
import { Alert } from "antd";
// @ts-ignore
import withStyles from "isomorphic-style-loader/withStyles";

import VendorForestHeader from "@Components/inc/header";
import VendorForestFooter from "@Components/inc/footer";

//eslin-ignore-next-line
import * as style from "./sass/index.scss";

class NoMatch extends React.Component {
  render() {
    return (
      <div className="App">
        <VendorForestHeader />
        <div className="container-wrap">
          <Alert
            message="The page that you are looking for may have moved or is no longer available."
            description="Please try finding what you need from our homepage"
            type="error"
            showIcon

            /* npm run start:prod */
          />
        </div>
        <VendorForestFooter />
      </div>
    );
  }
}

export default withStyles(style)(NoMatch);
