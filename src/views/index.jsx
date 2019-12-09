import React from "react";

class HelloMessage extends React.Component {
  render() {
    process.env.NODE_ENV === "development" &&
      console.log("Props: ", this.props);
    return <div>Hello {this.props.name}</div>;
  }
}

export default HelloMessage;
