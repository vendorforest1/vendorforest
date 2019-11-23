import React from "react";
import { Avatar, Badge } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { constants } from "@Shared/constants";
import { fetchContactedUser } from "../essential";

class ContactItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log("********did mount*********");
    this.props.fetchContactedUser();
  }

  render() {
    const UserList = () => {
      if (!this.props.connectedUser) {
        return "";
      }
      return this.props.connectedUser.map((member, index) => {
        return (
          <div key={index} className="contactitem">
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
                <p style={{ fontWeight: "normal" }}>
                  {this.props.user.userObj.username === member.from ? member.to : member.from}
                </p>
                <small style={{ color: "#9f9c9c" }}>{member.time}</small>
              </div>
              <p className="some-text">{`${member.msg}`.slice(0, 15)}...</p>
            </div>
          </div>
        );
      });
    };

    return <div>{UserList()}</div>;
  }
}

const mapStateToProps = ({ messagesReducer, loginReducer }) => {
  const { error, success, pending, connectedUser } = messagesReducer;
  const { user } = loginReducer;
  return {
    error,
    success,
    pending,
    connectedUser,
    user,
  };
};

export default connect(mapStateToProps, { fetchContactedUser })(ContactItem);
