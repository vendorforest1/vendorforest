import React from "react";
import { connect } from "react-redux";
import { Form, InputNumber, List, Rate, Card, Icon, Progress, message } from "antd";
import moment from "moment";
import { constants } from "@Shared/constants";
import { fetchReviewsData } from "../essential";
import ReviewItem from "./ReviewItem";

class VendorAbout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.fetchReviewsData();
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.success && newProps.success) {
      message.success(newProps.success);
    }
    if (!this.props.error && newProps.error) {
      message.error(newProps.error);
    }
  }

  render() {
    return (
      <div className="vendor-about">
        <Card
          title={<span className="h5 font-weight-bold">About</span>}
          className="shadow"
          style={{ marginBottom: "50px" }}
        >
          <div className="row">
            <div className="col-12 mb-4">
              <div className="d-flex flex-md-row flex-column justify-content-between">
                <div className="account-info d-flex mb-3">
                  <div className="photo-wrap">
                    <img
                      src={this.props.user.profileImage || constants.DEFAULT_PROFILEIMG}
                      alt="profile image"
                    />
                  </div>
                  <div className="ml-3">
                    <h3>{this.props.user.username}</h3>
                    {this.props.user.bsLocation && (
                      <p>
                        <Icon type="global" />
                        <span className="ml-1">
                          {this.props.user.bsLocation
                            ? `${this.props.user.bsLocation.city}, 
                                            ${this.props.user.bsLocation.state} ${this.props.user.bsLocation.country}`
                            : ""}
                        </span>
                      </p>
                    )}
                    <Rate value={this.props.user.vendor.rate} disabled allowHalf />
                    <span className="h6">{this.props.user.vendor.rate}</span>
                  </div>
                </div>
                <div className="status">
                  <p>Job Complated Rate</p>
                  <Progress
                    percent={this.props.user.vendor.jobCompletedRate}
                    size="small"
                    status="active"
                  />
                  <p>Profile Status</p>
                  <Progress percent={this.props.user.profilePercent} size="small" status="active" />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3 text-center">
                  <h3>$30</h3>
                  <h6>Hourly Rate</h6>
                </div>
                <div className="col-md-3 text-center">
                  <h3>${this.props.user.vendor.totalEarning}</h3>
                  <h6>Total Earning</h6>
                </div>
                <div className="col-md-3 text-center">
                  <h3>{this.props.user.vendor.jobs}</h3>
                  <h6>jobs</h6>
                </div>
                <div className="col-md-3 text-center">
                  <h3>{this.props.user.vendor.hoursWorked}</h3>
                  <h6>Hours Worked</h6>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card
          title={<span className="h5 font-weight-bold">Work History & Reviews</span>}
          className="shadow"
          style={{ marginBottom: "50px" }}
        >
          <div className="row">
            <div className="col-12 mb-4">
              {!this.props.reviews && this.props.pending && (
                <div className="w-100 p-5 text-center loading-small">
                  <Icon type="sync" spin />
                </div>
              )}
              {this.props.reviews && (
                <List
                  itemLayout="vertical"
                  size="large"
                  className="review-list"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 5,
                  }}
                  dataSource={this.props.reviews}
                  footer={<div></div>}
                  renderItem={(item, index) => (
                    <List.Item key={index} style={{ cursor: "pointer" }}>
                      <ReviewItem review={item} />
                    </List.Item>
                  )}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ vendorProfileReducer }) => {
  const { error, user, reviews, pending } = vendorProfileReducer;
  return {
    error,
    user,
    reviews,
    pending,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchReviewsData,
  },
)(VendorAbout);
