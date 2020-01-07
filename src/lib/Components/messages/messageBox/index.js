import React from "react";
import { connect } from "react-redux";
import MessageBoxTopbar from "./topbar";
import MessageList from "./messageList";
import SendBox from "./sendBox";

class MessageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="messagebox">
        {/* <MessageBoxTopbar /> */}
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
