// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { List, Rate, Card, Icon, Progress, message, Modal } from "antd";
import { fetchReviewsData } from "../essential";
import ReviewItem from "./ReviewItem";
import EditHourlyRate from "./EditHourlyRate";
import defaultProfileImage from "@Components/images/profileplace.png";

class VendorAbout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
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

  toggle() {
    this.setState({
      isModal: !this.state.isModal,
    });
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
                      src={this.props.user.profileImage || defaultProfileImage}
                      alt={"profile"}
                    />
                  </div>
                  <div className="ml-3">
                    <h3>
                      {this.props.user.firstName && this.props.user.lastName
                        ? `${this.props.user.firstName} ${this.props.user.lastName}`
                        : this.props.user.username}
                    </h3>
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
                  <div className="d-flex justify-content-center align-items-center">
                    <h3>{this.props.user.vendor ? this.props.user.vendor.hourlyRate || 30 : 30}</h3>
                    <div
                      className="h4 text-color ml-2 mb-0 pointer price-edit editable"
                      onClick={() => {
                        this.toggle();
                      }}
                    >
                      <Icon type="edit" />
                    </div>
                  </div>
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
        <Modal
          title="Edit Hourly Rate"
          visible={this.state.isModal}
          onOk={this.toggle}
          onCancel={this.toggle}
          width={"500px"}
          footer={null}
        >
          <EditHourlyRate
            rate={this.props.user.vendor ? this.props.user.vendor.hourlyRate || 30 : 30}
            toggle={this.toggle}
          />
        </Modal>
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

export default connect(mapStateToProps, {
  fetchReviewsData,
})(VendorAbout);
