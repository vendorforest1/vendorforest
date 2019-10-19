import React from "react";
import { Avatar, Badge } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { constants } from "@Shared/constants";
import {} from "../essential";

class ContactItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="contactitem">
        <span style={{ marginRight: 24 }}>
          <Badge count={1}>
            <Avatar
              size={50}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              style={{ backgroundColor: "#cdcdcd" }}
            />
          </Badge>
        </span>
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <p style={{ fontWeight: "normal" }}>Jaon Micle</p>
            <small style={{ color: "#9f9c9c" }}>9/29/10</small>
          </div>
          <p className="some-text">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ messagesReducer, loginReducer }) => {
  const { error, success, pending } = messagesReducer;
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
)(ContactItem);