import React from "react";
import { Avatar, Progress, Icon, Tabs, message } from "antd";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/withStyles";
import ClientHeader from "@Components/inc/client_header";
import { Footer } from "@Components/inc";
import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";
import Milestones from "./Milestones";
import AttachFiles from "./AttachFiles";
import Review from "./Review";
import { constants, getTimeFromTimezone } from "@Shared/constants";
import {
  fetchUpdateContractData,
  fetchEndContractData,
  fetchGetContractData,
} from "./essential";
import defaultProfileImage from "@Components/images/profileplace.png";
const { TabPane } = Tabs;

class ClientContractDetails extends React.Component {
  _button = -1;

  constructor(props) {
    super(props);
    this.state = {};
    this.clickTab = this.clickTab.bind(this);
    this.createNewMilestone = this.createNewMilestone.bind(this);
    this.endContract = this.endContract.bind(this);
  }

  clickTab(key) {
    process.env.NODE_ENV === "development" && console.log(key);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchGetContractData({
        _id: this.props.match.params.id,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.success && props.success) {
      message.success(props.success);
    }
    if (!state.error && props.error) {
      message.error(props.error);
    }
    return {
      success: props.success,
      error: props.error,
    };
  }

  createNewMilestone() {
    window.location.href = `/client/hire/${this.props.contract.job._id}&${this.props.contract.vendor._id}`;
    // this._button = 0;
    // if (this.props.match.params.id) {
    //   this.props.fetchUpdateContractData({
    //     _id: this.props.match.params.id,
    //     completedPercent: 100,
    //   });
    // }
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

  endContract() {
    this._button = 1;
    if (this.props.match.params.id) {
      const params = {
        _id: this.props.match.params.id,
      };
      this.EndContractData(params);
    }
  }

  async EndContractData(params) {
    // await this.props.fetchPostJob(params)
    fetchEndContractData(params)
      .then((data) => {
        console.log("post job data", data.message);
        message.success(data.message);
        window.location.href = `/client/givefeedback/${this.props.contract._id}`;
      })
      .catch((error) => {
        process.env.NODE_ENV === "development" && console.log(error);
        message.warning(error.message);
      });
  }

  render() {
    return (
      <div className="contract-details">
        {console.log("contract detail = ", this.props.contract)}
        <ClientHeader />
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
                            src={this.props.contract.vendor.profileImage || defaultProfileImage}
                            className="photo"
                          />
                          <div className="info ml-2">
                            <h6>
                              <a href="#/" className="text-color font-weight-bold">
                                {this.props.contract.vendor.username}
                              </a>
                            </h6>
                            <p className="text-grey">
                              {this.props.contract.vendor.bsLocation
                                ? `${this.props.contract.vendor.bsLocation.city} / ${this.props.contract.vendor.bsLocation.country}`
                                : "NONE"}
                            </p>
                            <p className="text-grey">
                              {this.props.contract.vendor.timeZone
                                ? getTimeFromTimezone(this.props.contract.vendor.timeZone)
                                : "NONE"}
                            </p>
                            {this.props.contract.status !== constants.CONTRACT_STATUS.END &&
                            (<div
                              className="text-color pointer h5"
                              onClick={() => {
                                window.location.href = "/messages/c";
                              }}
                            >
                              {console.log("milestones in fetch", this.props.milestones)}
                              <Icon type="message" />
                            </div>
                            )}
                          </div>
                        </div>
                        <div className="text-center mb-3 mb-md-0">
                          <h6 className="mb-2">{this.props.contract.job.title}</h6>
                          <Progress
                            percent={this.props.contract.completedPercent}
                            size="small"
                            status="active"
                            className="job-progress"
                          />
                          <p className="mt-2">
                            <a
                              href={`/client/job/${this.props.contract.job._id}`}
                              className="text-color"
                            >
                              Job Details
                            </a>
                          </p>
                        </div>
                        <div className="status">
                          {this.props.contract.status !== constants.CONTRACT_STATUS.END &&
                            !this.isLeftFeedBack() && (
                              <div>
                                <button
                                  className={`button-primary`}
                                  style={{ width: "200px" }}
                                  onClick={this.createNewMilestone}
                                >
                                  Create New Milestone
                                </button>
                              </div>
                            )}
                          {this.props.contract.status === constants.CONTRACT_STATUS.CREATED && (
                            <div>
                              <button
                                className={`button-white ${
                                  this._button === 1 && this.props.pending ? "disable" : ""
                                }`}
                                style={{ width: "200px" }}
                                onClick={this.endContract}
                              >
                                End Contract
                              </button>
                            </div>
                          )}
                          {/* {this.props.contract.status === constants.CONTRACT_STATUS.END &&
                            !this.isLeftFeedBack() && (
                              <div>
                                <button
                                  className="button-primary"
                                  onClick={() => {
                                    window.location.href = `/client/givefeedback/${this.props.contract._id}`;
                                  }}
                                >
                                  Leave Feedback
                                </button>
                              </div>
                            )} */}
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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ clientContractDetailsReducer, loginReducer }) => {
  const { error, contract, milestones, success, pending } = clientContractDetailsReducer;

  const { user } = loginReducer;

  return {
    error,
    contract,
    milestones,
    success,
    pending,
    user,
  };
};

export default connect(mapStateToProps, {
  fetchGetContractData,
  fetchEndContractData,
  fetchUpdateContractData,
})(withStyles(globalStyle, localStyle)(ClientContractDetails));
