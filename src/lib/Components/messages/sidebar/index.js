import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import SidebarControl from "./control";
import SidebarSearch from "./search";
import ContactList from "./contactList";
import { constants } from "@Shared/constants";
import {} from "../essential";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="sidebar">
        <SidebarControl />
        <SidebarSearch />
        <ContactList />
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
