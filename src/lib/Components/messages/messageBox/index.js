import React from "react";
import { connect } from "react-redux";
import MessageBoxTopbar from "./topbar";
import MessageList from "./messageList";
import SendBox from "./sendBox";
import { Avatar, Icon, Input, message } from "antd";

const { TextArea } = Input;
class MessageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      rows: 1,
      minRows: 1,
      maxRows: 10,
    };
  }

  componentDidMount = () => {
    const container = document.getElementById("chatList");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  };

  componentDidUpdate = () => {
    const container = document.getElementById("chatList");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  };

  handleType = (event) => {
    event.keyCode === 13
      ? this.handleSubmit()
      : this.setState({
          value: event.target.value,
        });
  };

  handleSubmit = () => {
    console.log("message submitted");
    if (this.messageValid(this.state.value) && this.props.chat) {
      this.props.handleSubmit(this.state.value);
      document.getElementById("chat-text-box").value = "";
    } else {
      message.info("You haven't connected Users to You.");
      document.getElementById("chat-text-box").value = "";
    }
  };
  handleClick = () => this.props.messageRead();

  messageValid = (txt) => txt && txt.replace(/\s/g, "").length;

  render() {
    const msgList = () => {
      if (!this.props.chat) {
        return "";
      }
      return this.props.chat.messages.map((msg, index) => {
        const { user, chat } = this.props;
        var sender =
          msg.sender !== user.userObj.email
            ? chat.userNames.filter((_user) => _user !== user.userObj.username)[0]
            : user.userObj.username;
        return (
          <div key={index} className="messageitem">
            <Avatar size={50} style={{ backgroundColor: "#07b107", minWidth: "50px" }}>
              {sender.split("")[0].toUpperCase()}
            </Avatar>
            <div className="message-content ml-3">
              <p className="mb-2" style={{ fontWeight: "bolder" }}>
                {sender}
              </p>
              <p className="msg-text mb-2">{msg.message}</p>
            </div>
            <div className="control">
              <p className="time mb-2">{msg.timeStamp}</p>
              <Icon type="setting" className="setting text-color pointer" />
            </div>
          </div>
        );
      });
    };

    return (
      <div className="messagebox">
        {/* <MessageBoxTopbar /> */}
        <div className="messagelist" id="chatList">
          {" "}
          {msgList()}{" "}
        </div>
        <div className="sendbox">
          <div className="msg-input mr-3">
            <textarea
              placeholder={"message here..."}
              className="textarea"
              onKeyUp={(e) => this.handleType(e)}
              // onFocus={this.handleClick}
              id="chat-text-box"
            ></textarea>
            <div className="mt-1">
              <Icon type="paper-clip" style={{ fontSize: "22px", color: "#929292" }} />
            </div>
          </div>
          <button className="button-primary" onClick={this.handleSubmit}>
            Send
          </button>
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

export default connect(mapStateToProps, {})(MessageBox);
