import React from "react";
import { Icon, Button } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import { connect } from "react-redux";

import VendorForestHeader from "@Components/inc/header";
import VendorForestFooter from "@Components/inc/footer";

import styles from "./index.scss";

import HeaderForm from "./HeaderForm";
import HomeCategories from "./HomeCategories";
import ServicesCategory from "./ServicesCategory";
import TopRatedVendors from "./TopRatedVendors";
import HowItWorks from "./HowItWorks";
import HowItWorksVendors from "./HowItWorksVendors";
import NewPostedJobs from "./NewPostedJobs";
import BuildTeamsBox from "./BuildTeamsBox";
import Mask from "./Mask";

import { fetchInitData } from "./essential";

class Home extends React.Component {
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
            <div className="row">
              <div className="col-md-4 col-2"></div>
              <div className="col-md-4 col-8 button_group">
                <Button.Group>
                  <Button
                    type="primary"
                    className={this.state.select !== "client" ? "button_selected" : "group_button"}
                    onClick={this.handleClient}
                  >
                    <Icon type="left" />
                    Client
                  </Button>
                  <Button
                    type="primary"
                    className={this.state.select !== "vendor" ? "button_selected" : "group_button"}
                    onClick={this.handleVendor}
                  >
                    Vendor
                    <Icon type="right" />
                  </Button>
                </Button.Group>
              </div>
              <div className="col-md-4 col-2"></div>
            </div>
            {this.state.select === "client" ? <HowItWorks /> : <HowItWorksVendors />}
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

export default connect(mapStateToProps, {
  fetchInitData,
})(withStyles(styles)(Home));
