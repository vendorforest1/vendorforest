import React from "react";
import $ from "jquery";
import { Icon } from "antd";
// @ts-ignore
import withStyles from "isomorphic-style-loader/withStyles";
import { connect } from "react-redux";
import VendorForestHeader from "@Components/inc/header";
import VendorForestFooter from "@Components/inc/footer";

// @ts-ignore
// import "./index.scss";
import styles from "./index.scss";

import HeaderForm from "./HeaderForm";
import HomeCategories from "./HomeCategories";
import ServicesCategory from "./ServicesCategory";
import TopRatedVendors from "./TopRatedVendors";
import HowItWorks from "./HowItWorks";
import NewPostedJobs from "./NewPostedJobs";
import BuildTeamsBox from "./BuildTeamsBox";
import Mask from "./Mask";
import { fetchInitData } from "./essential";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchInitData();
  }

  render() {
    console.log(this.props.pending, this.props.homedata);
    return (
      <div>
        {this.props.pending && <Mask />}
        {!this.props.pending && this.props.homedata && (
          <div>
            <VendorForestHeader />
            <HeaderForm {...this.props} />
            <HomeCategories />
            <ServicesCategory services={this.props.homedata.services} />
            <TopRatedVendors vendors={this.props.homedata.vendors} />
            <HowItWorks />
            <NewPostedJobs jobs={this.props.homedata.jobs} />
            <BuildTeamsBox />
            <VendorForestFooter />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ homeReducer, loginReducer }) => {
  const { error, homedata, success, pending } = homeReducer;

  const { user } = loginReducer;

  return { error, homedata, success, pending, user };
};

export default connect(
  mapStateToProps,
  {
    fetchInitData,
  },
)(withStyles(styles)(Home));
