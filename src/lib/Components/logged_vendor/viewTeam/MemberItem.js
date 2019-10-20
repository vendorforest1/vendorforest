import React from "react";
import { connect } from "react-redux";
import { Button, Icon, Avatar, Rate, Divider, Progress } from "antd";
import { constants } from "@Shared/constants";
import defaultProfileImage from "@Components/images/profileplace.png";

class VendorMemberItem extends React.Component {
  render() {
    return (
      <div className="member-item">
        <div className="row">
          <div className="col-md-5">
            <div className="member-info d-flex align-items-center">
              <img
                src={this.props.member.profileImage || defaultProfileImage}
                alt="vendorprofileimage"
                style={{ height: "50px", width: "50px" }}
              />
              <div className="member-name ml-3">
                <h6 className=" font-weight-bold">
                  {this.props.member.username}{" "}
                  {this.props.member._id === this.props.team.admin._id ? (
                    <span className="ml-2 text-danger">(Administrator)</span>
                  ) : (
                    ""
                  )}
                </h6>
                {this.props.member.vendor.service && this.props.member.vendor.category && (
                  <p>
                    {this.props.member.vendor.service
                      ? `${this.props.member.vendor.service.name} / ${this.props.member.vendor.category.name}`
                      : "NONE"}
                  </p>
                )}
                {this.props.member.bsLocation && (
                  <p>
                    <span className=" font-weight-bold">Location: </span>
                    <Icon type="global" />
                    <span className="ml-1">
                      {this.props.member.bsLocation.city}/{this.props.member.bsLocation.country}{" "}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Progress
              percent={this.props.member.vendor.jobComplatedReate}
              size="small"
              status="active"
              className="job-progress"
              style={{ width: "165px" }}
            />
            <div>
              <Rate disabled defaultValue={this.props.member.vendor.successRate} />
              <span>{this.props.member.vendor.successRate}</span>
            </div>
          </div>
          {this.props.team.admin._id === this.props.user.userObj._id &&
            this.props.member._id !== this.props.user.userObj._id && (
              <div className="col-md-3 d-flex justify-content-end align-items-center">
                <a
                  className="text-color pointer"
                  onClick={() => {
                    window.location.href = "/messages/v";
                  }}
                >
                  <Icon type="wechat" className="mr-1" />
                  Chat
                </a>
                <Divider type="vertical" />
                <a className="text-red">
                  <Icon type="delete" className="mr-1" />
                  Delete
                </a>
              </div>
            )}
          {this.props.team.admin._id !== this.props.user.userObj._id &&
            this.props.member._id !== this.props.user.userObj._id && (
              <div className="col-md-3 d-flex justify-content-end align-items-center">
                <a
                  className="text-color pointer"
                  onClick={() => {
                    window.location.href = "/messages/v";
                  }}
                >
                  <Icon type="wechat" className="mr-1" />
                  Chat
                </a>
              </div>
            )}
          {this.props.team.admin._id !== this.props.user.userObj._id &&
            this.props.member._id === this.props.user.userObj._id && (
              <div className="col-md-3 d-flex justify-content-end align-items-center">
                <a className="text-red">
                  <Icon type="delete" className="mr-1" />
                  Leave
                </a>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ vendorViewTeamReducer, loginReducer }) => {
  const { error, success, pending } = vendorViewTeamReducer;

  const { user } = loginReducer;

  return {
    error,
    success,
    pending,
    user,
  };
};
export default connect(
  mapStateToProps,
  {},
)(VendorMemberItem);
