import React from "react";
import VF_ClientHeader from "@Components/inc/client_header";
import VF_VendorHeader from "@Components/inc/vendor_header";
import withStyles from "isomorphic-style-loader/withStyles";
import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";
import ChatRoom from "./chatroom";

import {} from "./essential";
// let CCManager = undefined;

// if (typeof window !== " undefined") {

// }

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actype: this.props.match.params.actype,
    };
  }

  componentWillMount() {
    setInterval(() => {
      if (window) {
        console.log("yes");
      } else {
        console.log("no");
      }
    }, 1000);
  }

  render() {
    return (
      <div className="chat-section">
        {this.state.actype === "c" && <VF_ClientHeader />}
        {this.state.actype === "v" && <VF_VendorHeader />}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <ChatRoom />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(globalStyle, localStyle)(Messages);
