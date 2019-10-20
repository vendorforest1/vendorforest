import React from "react";
import { connect } from "react-redux";
import { List, Rate, Card, Icon, Progress, message } from "antd";
import { fetchReviewsData } from "../essential";
import ReviewItem from "./ReviewItem";
import defaultProfileImage from "@Components/images/profileplace.png";

class VendorAbout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  static async fetchInitialData(store) {
    console.log("async fetch vendorAbout");
    return await store.dispatch(fetchReviewsData());
  }

  componentDidMount() {
    // this.props.fetchReviewsData();
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
    const { user } = this.props.user;
    const vendorProfile = user && (
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
                    <img src={user.profileImage || defaultProfileImage} alt="profile image" />
                  </div>
                  <div className="ml-3">
                    <h3>{user.username}</h3>
                    {user.bsLocation && (
                      <p>
                        <Icon type="global" />
                        <span className="ml-1">
                          {user.bsLocation
                            ? `${user.bsLocation.city}, 
                                          ${user.bsLocation.state} ${user.bsLocation.country}`
                            : ""}
                        </span>
                      </p>
                    )}
                    <Rate value={user.vendor.rate} disabled allowHalf />
                    <span className="h6">{user.vendor.rate}</span>
                  </div>
                </div>
                <div className="status">
                  <p>Job Complated Rate</p>
                  <Progress percent={user.vendor.jobCompletedRate} size="small" status="active" />
                  <p>Profile Status</p>
                  <Progress percent={user.profilePercent} size="small" status="active" />
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
                  <h3>${user.vendor.totalEarning}</h3>
                  <h6>Total Earning</h6>
                </div>
                <div className="col-md-3 text-center">
                  <h3>{user.vendor.jobs}</h3>
                  <h6>jobs</h6>
                </div>
                <div className="col-md-3 text-center">
                  <h3>{user.vendor.hoursWorked}</h3>
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
    return vendorProfile ? vendorProfile : <div></div>;
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
