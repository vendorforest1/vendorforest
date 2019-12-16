import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import { connect } from "react-redux";

import { Header, Footer } from "@Components/inc";

import styles from "./index.scss";

import HeaderForm from "./HeaderForm";
import HomeCategories from "./HomeCategories";
import ServicesCategory from "./ServicesCategory";
import TopRatedVendors from "./TopRatedVendors";
import NewPostedJobs from "./NewPostedJobs";
import BuildTeamsBox from "./BuildTeamsBox";
import WhatIsGreat from "./HomeWhatIsGreat";
import Mask from "./Mask";

import { fetchInitData } from "./essential";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "client",
    };
    this.handleClient = this.handleClient.bind(this);
    this.handleVendor = this.handleVendor.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchInitData();
  }

  handleClient() {
    this.setState({
      select: "client",
    });
  }

  handleVendor() {
    this.setState({
      select: "vendor",
    });
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.props.pending && <Mask />}
        {!this.props.pending && this.props.homedata && (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <Header />
            <HeaderForm {...this.props} />
            <HomeCategories />
            <ServicesCategory services={this.props.homedata.services} />
            <TopRatedVendors vendors={this.props.homedata.vendors} />
            <WhatIsGreat />
            <NewPostedJobs jobs={this.props.homedata.jobs} />
            <BuildTeamsBox />
          </div>
        )}
        {this.props.homedata && <Footer />}
      </div>
    );
  }
}

const mapStateToProps = ({ homeReducer, loginReducer }) => {
  const { error, homedata, success, pending } = homeReducer;

  const { user } = loginReducer;

  return { error, homedata, success, pending, user };
};

export const Home = connect(mapStateToProps, {
  fetchInitData,
})(withStyles(styles)(HomeComponent));
