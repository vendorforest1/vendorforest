import React from "react";
import { Icon, Button } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import { connect } from "react-redux";

import { Header, Footer } from "@Components/inc";

import styles from "./index.scss";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "client",
    };
    // this.handleClient = this.handleClient.bind(this);
    // this.handleVendor = this.handleVendor.bind(this);
  }

  async componentDidMount() {}

//   handleClient() {
//     this.setState({
//       select: "client",
//     });
//   }

//   handleVendor() {
//     this.setState({
//       select: "vendor",
//     });
//   }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
        <div className="row">
            <h2>About Us</h2>
            <h6>World largest verified vendors</h6>
            <p>Your satisfaction is our reward</p>
        </div>
        <div className="row">
            <h3>This is our story</h3>
            <p>VendoForest story begins over few years ago, I wanted to create a platform that allowed people to find everything that they needed for their events and more in one place. </p>
        </div>
        <div className="row">
            <h3>A better and fair way of working is now here</h3>
            <p>I decided to redesign the wheel, I wanted to create a platform of transparacy, where vendors and clients can freerly interact without having to worry about fees. VendorForest is the only platform that makes it easier for vendors and clients to interact free of charge.</p>
        </div>
        <div className="row">
            <h3>We are creating a place of opportunities</h3>
            <p>Through VendoForest clients get more done, connecting with both vendors and pro vendors to work on events from Home improvement, Weddings, Events, and Wellness. VendorForest makes it fast, simple, and cost-effective to find, hire, work with, and pay the best vendors and pro vendors.</p>
        </div>
        <div className="row">
            <h3>VendorForest's vision</h3>
            <p>We want to create a platform of transparency between our clients and our vendors to work freerly and fairly.</p>
        </div>
        <div className="row">
            <h3>VendorForest's mission</h3>
            <p>We want vendors to use our platform without having the fear of spending money without being hired, and clients to use our platform because we have vendors who do what they love to do.</p>
        </div>
        <div className="row">
            <h3>More about our company</h3>
            <button>How it works</button>
        </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ homeReducer, loginReducer }) => {
  const { error, homedata, success, pending } = homeReducer;

  const { user } = loginReducer;

  return { error, homedata, success, pending, user };
};

export default connect(mapStateToProps, {})(withStyles(styles)(About));
