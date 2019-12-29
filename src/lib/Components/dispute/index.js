import React from "react";
import { Icon, Tabs } from "antd";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/withStyles";
import Header from "@Components/inc/client_header";
import VenorHeader from "@Components/inc/vendor_header";
import Footer from "@Components/inc/footer";
import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";
import PendingDispute from "./PendingDisputes";
import { getNotification } from "./essential";
import ClosedDispute from "./ClosedDisputes";
const { TabPane } = Tabs;

class ClientJobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickTab = this.clickTab.bind(this);
  }

  clickTab(key) {
    process.env.NODE_ENV === "development" && console.log(key);
  }

  componentDidMount() {
    // this.props.getNotification();
  }

  render() {
    return (
      <div className="job-details">
        {!this.props.pendingDisputes && (
          <div className="text-center loading-small py-5">
            <Icon type="sync" spin />
          </div>
        )}
        {this.props.user && (
          <div>
            {this.props.user.userObj.accountType === 0 ? <Header /> : <VenorHeader />}
            <div className="content">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="shadow p-md-5 p-2">
                      <h3>Disputes</h3>
                      <hr />
                      {/* {(!this.props.job || !this.props.proposales) && this.props.pending && (
                    <div className="text-center loading-small">
                      <Icon type="sync" spin />
                    </div>
                  )} */}
                      {/* {this.props.notification && ( */}
                      <Tabs defaultActiveKey="1" onChange={this.clickTab}>
                        <TabPane tab="Pending Disputes" key="1">
                          <PendingDispute />
                        </TabPane>
                        <TabPane tab="Closed Disputes" key="2">
                          <ClosedDispute />
                        </TabPane>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer, disputeReducer }) => {
  const { user } = loginReducer;
  const { pendingDisputes } = disputeReducer;
  return { user, pendingDisputes };
};

export default connect(
  mapStateToProps,
  {},
)(withStyles(globalStyle, localStyle)(ClientJobDetails));
