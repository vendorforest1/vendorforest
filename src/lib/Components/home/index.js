import React from "react";
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
import NewPostedJobs from "./NewPostedJobs";
import BuildTeamsBox from "./BuildTeamsBox";
import Mask from "./Mask";
import { fetchInitData } from "./essential";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // static getDerivedStateFromProps(props, state) {
  //   // Any time the current user changes,
  //   // Reset any parts of state that are tied to that user.
  //   // In this simple example, that's just the email.
  //   if (props.pending !== state.pending) {
  //     return {
  //       prevPropsUserID: props.userID,
  //       email: props.defaultEmail,
  //     };
  //   }
  //   return null;
  // }

  static async fetchInitialData(store) {
    return await store.dispatch(fetchInitData());
  }

  render() {
    const { pending, homedata } = this.props;
    return (
      <div>
        {pending && <Mask />}
        {!pending && homedata && (
          <div>
            <VendorForestHeader />
            <HeaderForm {...this.props} />
            <HomeCategories />
            <ServicesCategory services={homedata.services} />
            <TopRatedVendors vendors={homedata.vendors} />
            <HowItWorks />
            <NewPostedJobs />
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
