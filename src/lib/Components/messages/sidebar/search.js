import React from "react";
import { Button, Input } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { constants } from "@Shared/constants";
import {} from "../essential";
const { Search } = Input;
const ButtonGroup = Button.Group;

class SidebarSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="search">
        <Search
          size={"large"}
          placeholder="Search"
          onSearch={(value) => console.log(value)}
          className="w-100"
        />
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

export default connect(mapStateToProps, {})(SidebarSearch);
