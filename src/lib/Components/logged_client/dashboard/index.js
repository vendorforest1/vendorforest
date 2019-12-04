import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import Header from "@Components/inc/header";
import { Footer } from "@Components/inc";

import PostedJobs from "./PostedJobs";
import PendingContracts from "./PendingContracts";
import PastContracts from "./PastContracts";

import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";

class ClientDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postedJobs: [],
      pendingContracts: [],
      pastContracts: [],
    };
  }
  render() {
    return (
      <div className="client-dashboard">
        <Header />
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
        <Footer />
      </div>
    );
  }
}
export default withStyles(globalStyle, localStyle)(ClientDashboard);
