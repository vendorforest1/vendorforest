import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import { connect, ReactReduxContext } from "react-redux";
import VendorForestHeader from "@Components/inc/header";
import VendorForestFooter from "@Components/inc/footer";

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
// import { ContextProvider } from "@Shared/SharedContext";
import configureStore from "@Shared/configureStore";

const myStore = configureStore().store;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pending: false, user: undefined, homeData: undefined };
    this.store = configureStore().store;
  }
  static getDerivedStateFromProps(props, state) {
    if (props.homeData !== state.homeData) {
      return {
        pending: false,
        homeData: props.homeData,
      };
    } else {
      myStore.dispatch(fetchInitData());
      return {
        pending: true,
        homeData: undefined,
      };
    }
  }

  // static async fetchInitialData(store) {
  // await store.dispatch(fetchInitData());
  // }

  render() {
    const { pending, homeData } = this.state;
    return (
      <div>
        {pending && <Mask />}
        {!pending && homeData && (
          <div>
            <VendorForestHeader />
            <HeaderForm {...this.props} />
            <HomeCategories />
            <ServicesCategory services={homeData.services} />
            <TopRatedVendors vendors={homeData.vendors} />
            <HowItWorks />
            <NewPostedJobs jobs={this.props.homeData.jobs} />
            <BuildTeamsBox />
            <VendorForestFooter />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ homeReducer }) => {
  const { error, homedata, success, pending } = homeReducer;

  // const { user } = loginReducer;

  return { error, homeData: homedata, success, pending };
};

export default connect(mapStateToProps, {
  fetchInitData,
})(withStyles(styles)(Home));
