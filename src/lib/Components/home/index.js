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
import { ContextProvider } from "@Shared/SharedContext";

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
    console.log(store, "$$$$$$$$$$$$$");

    await store.dispatch(fetchInitData());
  }

  componentDidMount() {
    //this.persistor.dispatch({ type: REHYDRATE });
  }

  render() {
    const { pending, homedata } = this.props;

    return (
      <div>
        {pending && <Mask />}
        {!pending && homedata && (
          <div>
            <ContextProvider context={this.props.user}>
              <VendorForestHeader />
              <HeaderForm {...this.props} />
              <HomeCategories />
              <ServicesCategory services={homedata.services} />
              <TopRatedVendors vendors={homedata.vendors} />
              <HowItWorks />
              <NewPostedJobs jobs={this.props.homedata.jobs} />
              <BuildTeamsBox />
              <VendorForestFooter />
            </ContextProvider>
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
