import React from "react";
import { Avatar, Slider, Icon, Tabs, message } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import withStyles from "isomorphic-style-loader/withStyles";
import VF_ClientHeader from "@Components/inc/client_header";
import VF_Footer from "@Components/inc/footer";
import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";
import Milestones from "./Milestones";
import AttachFiles from "./AttachFiles";
import Review from "./Review";
import { constants, getTimeFromTimezone } from "@Shared/constants";
import { fetchGetContractData, fetchUpdateContractData, updateContract } from "./essential";
import defaultProfileImage from "@Components/images/profileplace.png";
import configureStore from "@Shared/configureStore";
import { REHYDRATE } from "redux-persist";

const { TabPane } = Tabs;
// const { persistor } = configureStore();
class VendorContractDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickTab = this.clickTab.bind(this);

    // persistor.dispatch({ type: REHYDRATE });
  }

  clickTab(key) {
    console.log(key);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchGetContractData({
        _id: this.props.match.params.id,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (!this.props.success && newProps.success) {
      message.success(newProps.success);
    }
    if (!this.props.error && newProps.error) {
      message.error(newProps.error);
    }
  }

  isLeftFeedBack() {
    if (this.props.contract.reviews.length === 0) {
      return false;
    }
    for (const review of this.props.contract.reviews) {
      if (review.from._id === this.props.user.userObj._id) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div className="contract-details">
        <VF_ClientHeader />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content-details shadow">
                  {!this.props.contract && this.props.pending && (
                    <div className="text-center loading-small py-5">
                      <Icon type="sync" spin />
                    </div>
                  )}
                  {this.props.contract && (
                    <div>
                      <div className="head d-md-flex d-block justify-content-between align-items-center">
                        <div className="user mb-3 mb-md-0">
                          <Avatar
                            src={this.props.contract.client.profileImage || defaultProfileImage}
                            className="photo"
                          />
                          <div className="info ml-2">
                            <h6>
                              <a href="" className="text-color font-weight-bold">
                                {this.props.contract.client.username}
                              </a>
                            </h6>
                            {this.props.contract.client.bsLocation && (
                              <p className="text-grey">
                                {this.props.contract.client.bsLocation.city}/
                                {this.props.contract.client.bsLocation.country}
                              </p>
                            )}
                            {this.props.contract.client.timeZone && (
                              <p className="text-grey">
                                {getTimeFromTimezone(this.props.contract.client.timeZone)}
                              </p>
                            )}
                            <div
                              className="text-color pointer h5"
                              onClick={() => {
                                window.location.href = "/messages/v";
                              }}
                            >
                              <Icon type="message" />
                            </div>
                          </div>
                        </div>
                        <div className="text-center mb-3 mb-md-0">
                          <h6 className="mb-2">{this.props.contract.job.title}</h6>
                          <Slider
                            value={this.props.contract.completedPercent}
                            className="job-progress"
                            onChange={(value) => {
                              const newContract = { ...this.props.contract };
                              newContract.completedPercent = value;
                              this.props.updateContract(newContract);
                            }}
                            onAfterChange={(value) => {
                              this.props.fetchUpdateContractData({
                                _id: this.props.contract._id,
                                completedPercent: value,
                              });
                            }}
                            disabled={
                              this.props.pending ||
                              this.props.contract.status === constants.CONTRACT_STATUS.END
                            }
                          />
                          <p className="mt-2">
                            <a
                              href={`/vendor/job/${this.props.contract.job._id}`}
                              className="text-color"
                            >
                              Job Details
                            </a>
                          </p>
                        </div>
                        <div className="status">
                          {this.props.contract.status === constants.CONTRACT_STATUS.END &&
                            !this.isLeftFeedBack() && (
                              <div>
                                <button
                                  className="button-primary"
                                  onClick={() => {
                                    this.props.history.push(
                                      `/vendor/givefeedback/${this.props.contract._id}`,
                                    );
                                  }}
                                >
                                  Leave Feedback
                                </button>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="main-content">
                        <Tabs defaultActiveKey="1" onChange={this.clickTab}>
                          <TabPane tab="MILESTONES & PAYMENTS" key="1">
                            <Milestones />
                          </TabPane>
                          <TabPane tab="ATTACHED FILES" key="2">
                            <AttachFiles />
                          </TabPane>
                          <TabPane tab="REVIEWS" key="3">
                            <Review />
                          </TabPane>
                        </Tabs>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <VF_Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ vendorContractDetailsReducer, loginReducer, persistorReducer }) => {
  console.log(persistorReducer, " <---------------");
  const { error, contract, success, pending } = vendorContractDetailsReducer;

  const { user } = loginReducer;

  return { error, contract, success, pending, user };
};

export default connect(
  mapStateToProps,
  {
    fetchGetContractData,
    fetchUpdateContractData,
    updateContract,
  },
)(withStyles(globalStyle, localStyle)(VendorContractDetails));
