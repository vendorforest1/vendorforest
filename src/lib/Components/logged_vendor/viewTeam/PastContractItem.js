import React from "react";
import moment from "moment";
const { Icon, Avatar, Rate } = require("antd");

class VendorPastContractItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  displaySkills() {
    if (this.props.contract.job.skills.length === 0) {
      return "";
    }
    let skills = this.props.contract.job.skills[0];
    this.props.contract.job.skills.splice(0, 1).forEach((skill) => {
      skills += ` / ${skill}`;
    });
    return skills;
  }

  render() {
    return (
      <div className="past-contract-item ">
        <div className="row">
          <div className="col-lg-6 mb-3">
            <h5 className="mb-2 text-grey">{this.props.contract.job.title}</h5>
            <p className="mb-3 text-grey">{this.displaySkills()}</p>
            <p>
              <b>Completed date & time:</b> <Icon type="calendar" />{" "}
              {moment(this.props.contract.completedDate).format("MMMM DD, YYYY")} -{" "}
              <Icon type="clock-circle" />{" "}
              {moment(this.props.contract.startDate).format("HH:mm A")}
            </p>
            <p>
              <b>Complete Budget:</b> <Icon type="dollar" />{" "}
              <span className="text-color"> ${this.props.contract.completedBudget}</span>
            </p>
          </div>
          <div className="col-lg-6 d-md-flex justify-content-between d-block">
            <div className="user">
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className="photo"
              />
              <div className="info ml-2">
                <h6>
                  <a href="" className="text-color font-weight-bold">
                    {this.props.contract.employee.name}
                  </a>
                </h6>
                <p className="text-grey">{this.props.contract.employee.location}</p>
                <p className="text-grey">{this.props.contract.employee.localTime}</p>
              </div>
            </div>
            <div className="rate text-center">
              <Rate disabled defaultValue={this.props.contract.rate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VendorPastContractItem;
