import React from "react";
import { Button, Icon, Avatar, Rate, Modal, Progress, message } from "antd";
import SendInvite from "./SendInvite";
import { hireVendor } from "./essential";

import { constants } from "@Shared/constants";

class VendorItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModal: false,
      title: undefined,
      text: undefined,
      check: false,
    };
    this.toggle = this.toggle.bind(this);
    this.selectCallback = this.selectCallback.bind(this);
    this.handleContract = this.handleContract.bind(this);
  }

  toggle() {
    this.setState({
      isModal: !this.state.isModal,
    });
  }
  handleContract() {
    this.setState({
      isModal: !this.state.isModal,
    });
    if (this.state.check === false) {
      message.warning("You have to the check the checkbox.");
      return;
    }
    if (this.state.title === undefined) {
      message.warning("You have to select the Job title.");
      return;
    }
    if (this.state.title.proposales.length > 0) {
      this.state.title.proposales.map((proposal) => {
        if (proposal.vendor === this.props.user._id) {
          message.warning("This vendor already bidded on this project.");
          return;
        }
      });
    }
    // console.log(this.state.title);
    const params = {
      job: this.state.title._id,
      vendor: this.props.user._id,
      offerBudget: this.state.title.budget,
      offerBudgetType: this.state.title.budgetType,
      bidType: 0,
      message: this.state.text,
      stDateTime: this.state.title.stDateTime,
      endDateTime: this.state.title.endDateTime,
      phone: this.props.user.phone,
      email: this.props.user.email,
      username: this.props.user.username,
    };
    hireVendor(params).then((result) => {
      window.location.href = `/client/hire/${result.data.job}&${result.data.vendor}`;
    });
  }

  selectCallback(childData) {
    this.setState({
      title: childData,
    });
  }

  textCallback = (childData) => {
    this.setState({
      text: childData,
    });
  };

  checkCallback = (childData) => {
    this.setState({
      check: childData,
    });
  };

  displaySkills() {
    if (this.props.vendor.skills.length === 0) {
      return "";
    }
    let skills = this.props.vendor.skills[0];
    this.props.vendor.skills.splice(0, 1).forEach((skill) => {
      skills += ` / ${skill}`;
    });
    return skills;
  }

  render() {
    const { user } = this.props;
    // const { vendor } = user;
    return (
      <div className="vendor-item d-md-flex d-block justify-content-between">
        <div className="vendor-info d-flex mb-3 mb-md-0">
          <div className="vendor-photo">
            <Avatar src={`${user.profileImage}`} size={80} style={{ width: "80px" }} />
          </div>
          <div className="vendor-summary ml-2">
            <h5
              className="vendor-name"
              onClick={() => {
                window.location.href = "/vendor/profile/" + user.username;
              }}
            >
              {user.username}
            </h5>
            {user.vendor.service && user.vendor.category && (
              <p>
                {user.vendor.service.name} / {user.vendor.category.name}
              </p>
            )}
            {/* <p>{this.displaySkills()}</p> */}
            <h6 className="text-blue">{constants.ACCOUNTTYPES[user.accountType]}</h6>
            <p className="text-grey">
              <Icon type="global" />
              {user.bsLocation && (
                <span className="ml-1">
                  {`${user.bsLocation.city}`}, &nbsp; {`${user.bsLocation.state}`}
                </span>
              )}
            </p>
            <Progress
              percent={
                user.vendor.jobs !== 0
                  ? Number((user.vendor.jobComplatedReate / user.vendor.jobs).toFixed(0))
                  : 0
              }
              size="small"
              status="active"
              className="job-progress"
            />
            <div className="text-grey">
              <span className="mr-2">
                {user.vendor.reviewCount !== 0
                  ? (user.vendor.rate / user.vendor.reviewCount).toFixed(1)
                  : 0}
              </span>
              <Rate
                disabled
                value={
                  user.vendor.reviewCount !== 0
                    ? Number((user.vendor.rate / user.vendor.reviewCount).toFixed(1))
                    : 0
                }
              />
              <span className="mx-2">{user.vendor.reviewCount} Reviews</span>
            </div>
          </div>
        </div>
        <div className="vendor-action d-flex flex-md-column flex-row align-items-center">
          <h6 className="vendor-subinfo text-color text-md-right text-center col">
            ${user.vendor.hourlyRate}/hr
          </h6>
          <div className="col">
            <button className="button-primary" onClick={this.toggle}>
              Hire Vendor
            </button>
          </div>
        </div>
        <Modal
          title={`Hire ${this.props.user.username}`}
          visible={this.state.isModal}
          // onOk={this.toggle}
          onCancel={this.toggle}
          width={"50%"}
          footer={
            <Button
              key="next"
              type="primary"
              onClick={this.handleContract}
              style={{ width: "120px" }}
            >
              Hire Vendor
            </Button>
          }
        >
          <SendInvite
            title={this.selectCallback}
            text={this.textCallback}
            check={this.checkCallback}
          />
        </Modal>
      </div>
    );
  }
}

export default VendorItem;
