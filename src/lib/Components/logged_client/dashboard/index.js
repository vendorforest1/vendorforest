import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import VendorForestClientHeader from "@Components/inc/client_header";
import VendorForestFooter from "@Components/inc/footer";

import PostedJobs from "./PostedJobs";
import PendingContracts from "./PendingContracts";
import PastContracts from "./PastContracts";

import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";
import createStore from "@Shared/configureStore";

class ClientDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postedJobs: [],
      pendingContracts: [],
      pastContracts: [],
    };
  }
  componentWillUnmount() {
    // this.persistor.dispatch({ type: "persist/REHYDRATE" });
  }
  render() {
    return (
      <div className="client-dashboard">
        <VendorForestClientHeader />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-md-4 mb-3">
                <PostedJobs />
              </div>
              <div className="col-12 mb-md-4 mb-3">
                <PendingContracts />
              </div>
              <div className="col-12 mb-md-4 mb-3">
                <PastContracts />
              </div>
            </div>
          </div>
        </div>
        <VendorForestFooter />
      </div>
    );
  }
}
export default withStyles(globalStyle, localStyle)(ClientDashboard);
