import React from "react";
import io from "socket.io-client";
import VF_ClientHeader from "@Components/inc/client_header";
import VF_VendorHeader from "@Components/inc/vendor_header";
import withStyles from "isomorphic-style-loader/withStyles";
import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";
import { connect } from "react-redux";
import { fetchContactedUser } from "./essential";
import ChatRoom from "./chatroom";

import {} from "./essential";

const socket = io();

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actype: this.props.match.params.actype,
    };
  }

  componentDidMount() {
    this.props.fetchContactedUser();
    const accountType = this.props.user.userObj.accountType;
    const friends = this.props.connectedUser;
    var users = [];
    if (friends) {
      for (var i = 0; i < Object.keys(friends).length; i++) {
        users[i] = accountType === 0 ? friends[i].roomName : friends[i].user;
      }
    }
    console.log("accountType === ", accountType, "friend ======", users.toString());
    const userID = this.props.user.userObj._id;
    const userName = this.props.user.userObj.username;
    const profileImage = this.props.user.userObj.profileImage;
    window.chat_id = userID;
    window.chat_name = userName;
    window.chat_avatar = profileImage;
    window.chat_link = "Tom, chen, gerardvendor";

    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src =
      "https://fast.cometondemand.net/" + window.chat_appid + "x_xchatx_xcorex_xembedcode.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(js, s);
    js.onload = function() {
      window.chat_iframe.style =
        "width:" +
        window.chat_width +
        ";height:" +
        window.chat_height +
        ";max-width:100%;border:1px solid #CCCCCC;border-radius:5px;overflow:hidden;";
      window.chat_iframe.module = "synergy";
      window.chat_iframe.width = window.chat_width.replace("px", "");
      window.chat_iframe.height = window.chat_height.replace("px", "");
      window.chat_iframe.src =
        "https://" + window.chat_appid + ".cometondemand.net/cometchat_embedded.php";
      if (typeof window.addEmbedIframe == "function") {
        window.addEmbedIframe(window.chat_iframe);
      }
    };

    // const user = this.props.user.userObj.username;
    // socket.emit("join", user, () => {
    //   console.log("This is first socket.io connection");
    // });
    // socket.on('emit', (result) => {
    //   alert(result);
    // });
  }

  render() {
    return (
      <div className="chat-section">
        {this.state.actype === "c" && <VF_ClientHeader />}
        {this.state.actype === "v" && <VF_VendorHeader />}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div id="cometchat_embed_synergy_container"></div>
            </div>
          </div>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, { fetchContactedUser })(
  withStyles(globalStyle, localStyle)(Messages),
);
