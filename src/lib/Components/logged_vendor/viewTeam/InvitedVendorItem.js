import React from "react";
import { connect } from "react-redux";
import { Button, Icon, Avatar, Rate, Divider, Progress, message } from "antd";
import { constants } from "@Shared/constants";
import { fetchInviteAccept, fetchInviteDecline, updateTeam } from "./essential";

class InvitedVendorItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.accept = this.accept.bind(this);
    this.decline = this.decline.bind(this);
  }

  accept() {
    const params = {
      _id: this.props.team._id,
      invitedUser: this.props.member._id,
    };
    this.props.fetchInviteAccept(params);
  }

  decline() {
    const params = {
      _id: this.props.team._id,
      invitedUser: this.props.member._id,
    };
    fetchInviteDecline(params)
      .then((data) => {
        if (this.isAdmin()) {
          this.props.updateTeam(data.data);
          message.success(data.message);
        } else {
          window.history.back();
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  isAdmin() {
    return this.props.team.admin._id === this.props.user.userObj._id;
  }

  render() {
    return (
      <div className="member-item">
        <div className="row">
          <div className="col-md-5">
            <div className="member-info d-flex align-items-center">
              <img
                src={this.props.member.profileImage || constants.DEFAULT_PROFILEIMG}
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
                    {this.props.member.vendor.service.name} /{" "}
                    {this.props.member.vendor.category.name}
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
          {this.isAdmin() && (
            <div className="col-md-3 d-flex justify-content-end align-items-center">
              <a className="text-red" onClick={this.decline}>
                <Icon type="close" className="mr-1" />
                Cancel
              </a>
            </div>
          )}
          {this.props.member._id === this.props.user.userObj._id && (
            <div className="col-md-3 d-flex justify-content-end align-items-center">
              <a className="text-color pointer" onClick={this.accept}>
                <Icon type="check" className="mr-1" />
                Accept
              </a>
              <Divider type="vertical" />
              <a className="text-danger pointer" onClick={this.decline}>
                <Icon type="close" className="mr-1" />
                Decline
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
  {
    fetchInviteAccept,
    updateTeam,
  },
)(InvitedVendorItem);
