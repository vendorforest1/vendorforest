import React from "react";

class HelloMessage extends React.Component {
  render() {
    console.log("Props: ", this.props);
    return <div>Hello {this.props.name}</div>;
  }
}

export default HelloMessage;
