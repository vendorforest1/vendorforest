import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import SidebarControl from "./control";
import SidebarSearch from "./search";
import ContactList from "./contactList";
import { constants } from "@Shared/constants";
import {} from "../essential";
import { Badge, Avatar } from "antd";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSelect(index) {
    this.props.selectedChatIndex(index);
  }
  userIsSender = (chat) =>
    chat.messages[chat.messages.length - 1].sender === this.props.user.userObj.email;
  render() {
    const UserList = () => {
      if (!this.props.chats) {
        return "";
      }
      return this.props.chats.map((member, index) => {
        const { user } = this.props;
        return (
          <div
            key={index}
            className={`contactitem ${this.props.selectedChat === index ? "selected" : ""}`}
            onClick={() => this.handleSelect(index)}
          >
            <span style={{ marginRight: 24 }}>
              <Badge
                status={
                  member.receiverHadRead === false && !this.userIsSender(member)
                    ? "error"
                    : undefined
                }
              >
                <Avatar>
                  {member.userNames
                    .filter((_user) => _user !== user.userObj.username)[0]
                    .split("")[0]
                    .toUpperCase()}
                </Avatar>
              </Badge>
            </span>
            <div className="w-100">
              <div className="d-flex justify-content-between align-items-center">
                <p style={{ fontWeight: "normal" }}>
                  {" "}
                  {member.userNames.filter((_user) => _user !== user.userObj.username)[0]}{" "}
                </p>
                <small style={{ color: "#9f9c9c" }}>
                  {member.messages[member.messages.length - 1].timeStamp}
                </small>
              </div>
              <p className="some-text">
                {member.messages[member.messages.length - 1].message.substring(0, 30) + "..."}
              </p>
            </div>
          </div>
        );
      });
    };

    return (
      <div className="sidebar">
        <SidebarControl />
        <SidebarSearch />
        <div className="contactlist">{UserList()}</div>
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

export default connect(mapStateToProps, {})(Sidebar);
