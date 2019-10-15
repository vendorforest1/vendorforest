import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { constants } from "@Shared/constants";
import Sidebar from "./sidebar/index";
import MessageBox from "./messageBox/index";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="chat-room">
        <Sidebar />
        <MessageBox />
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
)(ChatRoom);
