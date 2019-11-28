import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import MessageBoxTopbar from "./topbar";
import MessageList from "./messageList";
import SendBox from "./sendBox";
import { constants } from "@Shared/constants";
import {} from "../essential";

class MessageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="messagebox">
        <MessageBoxTopbar />
        <MessageList />
        <SendBox />
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

export default connect(mapStateToProps, {})(MessageBox);
