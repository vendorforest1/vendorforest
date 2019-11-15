import React from "react";
import { connect } from "react-redux";
import { Button, Icon, Tag, Rate } from "antd";
import moment from "moment";
import { constants } from "@Shared/constants";
import defaultProfileImage from "@Components/images/profileplace.png";

class JobItem extends React.Component {
  componentDidMount() {}

  displaySkills() {
    return this.props.job.subCategories.map((subct, index) => {
      return (
        <Tag key={index} color="#ddd" className="text-dark mb-1">
          {subct}
        </Tag>
      );
    });
  }

  getBudgetType() {
    return this.props.job.budgetType === constants.BUDGET_TYPE.FIXED ? "Fixed Price" : "Hourly";
  }

  getProposal() {
    const index =
      this.props.user &&
      this.props.job.proposales.findIndex(
        (proposal) => proposal.vendor === this.props.user.userObj._id,
      );
    return index > -1 ? this.props.job.proposales[index] : null;
  }

  render() {
    return (
      <div className="px-4">
        <div className="job-item mb-2">
          <div className="job-summary mr-md-3 mr-0">
            <h5 className="mb-2 text-dark">{this.props.job.title}</h5>
            <h6 className="mb-2 text-dark">
              <span>{this.getBudgetType()}</span> |{" "}
              <span className="h6 text-color mr-2">
                ${this.props.job.budget}
                {this.props.job.budgetType === 1 ? "/hr" : ""}
              </span>
              {this.props.job.budgetType === 1 && (
                <span>({constants.AVB_HRSPERWEEKS[this.props.job.avbHrsPerWeek]})</span>
              )}
            </h6>
            <p className="mb-2">
              <Icon type="global" />
              <span className="ml-1">
                Location: {this.props.job.location.city} / {this.props.job.location.country}
              </span>
            </p>
            <p className="color-gray">
              <Icon type="calendar" />
              <span className="ml-1">
                {moment(this.props.job.stDateTime).format("YYYY/MM/DD")}-
              </span>
              <Icon type="clock-circle" />
              <span className="ml-1">{moment(this.props.job.stDateTime).format("HH:mm")}</span>
              <span className="mx-2 font-weight-bold">To</span>
              <Icon type="calendar" />
              <span className="ml-1">
                {moment(this.props.job.endDateTime).format("YYYY/MM/DD")}-
              </span>
              <Icon type="clock-circle" />
              <span className="ml-1">{moment(this.props.job.endDateTime).format("HH:mm")}</span>
            </p>
          </div>
          <div className="job-action text-md-right text-center ">
            <button
              className="button-primary col"
              onClick={(e) => {
                e.stopPropagation();
                if (this.getProposal() != null) {
                  this.props.history.push(
                    `/vendor/placebid/${this.props.job._id}/${this.getProposal()._id}`,
                  );
                } else {
                  this.props.history.push(`/vendor/placebid/${this.props.job._id}`);
                }
              }}
            >
              {this.getProposal() != null ? "Edit Bid" : "Place a bid"}
            </button>
            {this.props.job.status === constants.JOB_STATUS.HIRED && (
              <p className="text-color mt-3 w-100 text-center">
                <Icon type="check-circle" className="mr-2" />
                hired
              </p>
            )}
            <p></p>
          </div>
        </div>
        <p className="mb-2">
          {this.props.job.description.length > 200
            ? this.props.job.description.slice(0, 200) + "..."
            : this.props.job.description}
        </p>
        <div className="w-100 mb-3">{this.displaySkills()}</div>
        <div className="client d-flex">
          <img
            src={this.props.job.client.profileImage || defaultProfileImage}
            style={{ height: "35px", width: "35px" }}
          ></img>
          <div className="ml-2">
            <h6 className="text-color">{this.props.job.client.username}</h6>
            <h6 className="text-dark">
              <span>
                {" "}
                {this.props.job.client.bsLocation
                  ? this.props.job.client.bsLocation.country
                  : this.props.job.location.country}{" "}
                | ${this.props.job.client.client && this.props.job.client.client.totalSpent} spent
              </span>
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ findJobReducer, loginReducer }) => {
  const { user } = loginReducer;
  return {
    user,
  };
};
export default connect(mapStateToProps, {})(JobItem);
