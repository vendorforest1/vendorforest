import React from "react";
import { Button, Icon, Avatar, Rate, Progress, message } from "antd";
import { constants } from "@Shared/constants";
import { DeleteNotification } from "./essential";
import { connect } from "react-redux";

class VendorItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const params = {
      _id: this.props.notification._id,
      status: constants.NOTIFICATION_STATUS.DELETED,
    };
    DeleteNotification(params)
      .then((data) => {
        // this.props.updateNotification(data.data);
        // alert(data.message);
        message.success(data.message);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }
  render() {
    return (
      <div className="propposal-item ">
        {this.props.notification && (
          <div className="row">
            <div className="col-lg-9 col-md-8 vendor-profile-content d-flex">
              <a href="" onClick={this.handleDelete}>
                <Icon type="delete" theme="filled" style={{ fontSize: "18px" }} />{" "}
              </a>
              &nbsp;&nbsp;
              <a href={this.props.notification.urlId ? this.props.notification.urlId : ""}>
                <span>{this.props.notification.notificationMsg}</span>
              </a>
            </div>
            <div className="col-lg-3 col-md-4 vendor-rate">{this.props.notification.time}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => {
  const { user } = loginReducer;
  return { user };
};

export default connect(mapStateToProps, {
  DeleteNotification,
})(VendorItem);
