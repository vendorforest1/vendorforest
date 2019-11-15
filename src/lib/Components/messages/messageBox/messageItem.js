import React from "react";
import { Avatar, Icon } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { constants } from "@Shared/constants";
import {} from "../essential";

class MessageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="messageitem">
        <Avatar
          size={50}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          style={{ backgroundColor: "#cdcdcd", minWidth: "50px" }}
        />
        <div className="message-content ml-3">
          <p className="mb-2" style={{ fontWeight: "normal" }}>
            Jaon Micle
          </p>
          <p className="msg-text">
            Thanks for your reading my proposal. I'm a senior web developer and I think i can help
            you. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolor. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Fugiat, rerum dolore. Praesentium
            quis qui excepturi laboriosam rerum voluptas autem officia vel perferendis recusandae ea
            voluptatum libero, necessitatibus, accusantium veritatis, beatae facere culpa harum
            perspiciatis suscipit nesciunt! Minima laboriosam nemo, suscipit a fuga laudantium iusto
            perspiciatis, sit placeat quis, exercitationem et.
          </p>
        </div>
        <div className="control">
          <p className="time mb-2">3:07 AM</p>
          <Icon type="setting" className="setting text-color pointer" />
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

export default connect(mapStateToProps, {})(MessageItem);
