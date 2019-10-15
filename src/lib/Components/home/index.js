import React from "react";
// import * as $ from "jquery";
import { Icon } from "antd";
// @ts-ignore
import withStyles from "isomorphic-style-loader/withStyles";

import VendorForestHeader from "@Components/inc/header";
import VendorForestFooter from "@Components/inc/footer";

// @ts-ignore
// import "./index.scss";
import styles from "./index.scss";

// @ts-ignore
import postBig from "@Components/bigsvgs/post_big.svg";
// @ts-ignore
import iteractivePost from "@Components/smallsvgs/interactive/post.svg";
// @ts-ignore
import interactiveBid from "@Components/smallsvgs/interactive/bid.svg";
// @ts-ignore
import bidBig from "@Components/bigsvgs/bid_big.svg";
// @ts-ignore
import workBig from "@Components/bigsvgs/work_big.svg";
// @ts-ignore
import interactiveWork from "@Components/smallsvgs/interactive/work.svg";
// @ts-ignore
import getPaid from "@Components/smallsvgs/static/getpaid.svg";
// @ts-ignore
import getPaidBig from "@Components/bigsvgs/getpaid_big.svg";

// @ts-ignore
import homeIcon from "@Components/NewIcons/icons_Home.png";
// @ts-ignore
import eventsIcon from "@Components/NewIcons/icons_Events.png";
// @ts-ignore
import weddingsIcon from "@Components/NewIcons/icons_Weddings.png";
// @ts-ignore
import wellnessIcon from "@Components/NewIcons/icons_Wellness.png";
// @ts-ignore
import venueIcon from "@Components/NewIcons/icons_Venue.png";

class Home extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <VendorForestHeader />
        <HeaderForm {...this.props} />
        <HomeCategories />
        <ServicesCategory />
        <TopRatedVendors />
        <HowItWorks />
        <NewPostedJobs />
        <BuildTeamsBox />
        <VendorForestFooter />
      </div>
    );
  }
}

const Dashbord = withStyles(styles)(Home);
export default Dashbord;

// export default Home;

export class BuildTeamsBox extends React.Component {
  render() {
    return (
      <div className="build-team-box">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="mb-5">Build your team online</h1>
              <button className="button-white">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export class HowItWorks extends React.Component {
  render() {
    return (
      <div className="how-it-work">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-5">How it works</h1>
              <div className="content">
                <div className="step mb-5">
                  <div className="row">
                    <div className="col-lg-2 col-md-3 explain-img d-flex justify-content-center align-items-center">
                      <img src={postBig} alt="Find vendor" />
                    </div>
                    <div className="col-lg-10 col-md-9 d-flex align-items-center">
                      <div className="explain-content pr-md-5 pr-0">
                        <div className="step-title">
                          <h1 className="mr-3">Post</h1>
                          <img src={iteractivePost} alt="Find vendor" />
                        </div>
                        <p>
                          Tell us about your project. Vendorforest connects you with top vendors
                          around the world, or near you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step mb-5">
                  <div className="row">
                    <div className="col-lg-10 col-md-9 order-2 order-md-1 d-flex align-items-center">
                      <div className="explain-content pl-md-5 pl-0">
                        <div className="step-title">
                          <h1 className="mr-3">Bid</h1>
                          <img src={interactiveBid} alt="Find vendor" />
                        </div>
                        <p>
                          {" "}
                          Get qualified proposals within 24 hours. Compare bids, reviews, and prior
                          work. Interview favorites and hire the best fit.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-3  order-1  order-md-2explain-img d-flex justify-content-center align-items-center">
                      <img src={bidBig} alt="Find vendor" />
                    </div>
                  </div>
                </div>
                <div className="step mb-5">
                  <div className="row">
                    <div className="col-lg-2 col-md-3 explain-img d-flex justify-content-center align-items-center">
                      <img src={workBig} alt="Find vendor" />
                    </div>
                    <div className="col-lg-10 col-md-9 d-flex align-items-center">
                      <div className="explain-content pr-md-5 pr-0">
                        <div className="step-title">
                          <h1 className="mr-3">Work</h1>
                          <img src={interactiveWork} alt="Find vendor" />
                        </div>
                        <p>
                          Use Vendorforest to chat with the vendors, share files, and track project
                          milestones from your desktop or mobile.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="row">
                    <div className="col-lg-10 col-md-9 order-2 order-md-1 d-flex align-items-center">
                      <div className="explain-content pl-md-5 pl-0">
                        <div className="step-title">
                          <h1 className="mr-3">Get Paid</h1>
                          <img src={getPaid} alt="Find vendor" />
                        </div>
                        <p>
                          {" "}
                          Pay fixed-price and receive invoices through Vendorforest. Only pay for
                          work you authorize.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-3 order-1 order-md-2 explain-img d-flex justify-content-center align-items-center">
                      <img src={getPaidBig} alt="Find vendor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class ServicesCategory extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    };
  }

  // @ts-ignore
  selectTab(index) {
    this.setState({
      selectedTab: index,
    });
  }

  render() {
    return (
      <div className="service-category">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-5">
                Find The <span className="text-color">Right Services</span> For The Right Job
              </h1>
              <div className="tab-head">
                <div
                  className={`item ${this.state.selectedTab === 0 ? "active" : ""}`}
                  onClick={() => this.selectTab(0)}
                >
                  Home
                </div>
                <div
                  className={`item ${this.state.selectedTab === 1 ? "active" : ""}`}
                  onClick={() => this.selectTab(1)}
                >
                  Events
                </div>
                <div
                  className={`item ${this.state.selectedTab === 2 ? "active" : ""}`}
                  onClick={() => this.selectTab(2)}
                >
                  Weddings
                </div>
                <div
                  className={`item ${this.state.selectedTab === 3 ? "active" : ""}`}
                  onClick={() => this.selectTab(3)}
                >
                  Wellness
                </div>
              </div>
              <div className={`tab-content ${this.state.selectedTab === 0 ? "d-block" : "d-none"}`}>
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <div className="content-item">
                      <div className="category-icon">
                        <i className="icon-bargraph" aria-hidden="true">
                          <img src="https://img.icons8.com/ios-glyphs/50/07b107/construction-worker.png" />
                        </i>
                        <i className="icon-bargraph abs-icon" aria-hidden="true"></i>
                      </div>
                      <small>Accessibility Construction And Remodels</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="content-item">
                      <div className="category-icon">
                        <i className="icon-bargraph" aria-hidden="true">
                          <img src="https://img.icons8.com/ios-glyphs/50/07b107/fridge.png" />
                        </i>
                        <i className="icon-bargraph abs-icon" aria-hidden="true"></i>
                      </div>
                      <small>Appliances</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="content-item">
                      <div className="category-icon">
                        <i className="icon-bargraph" aria-hidden="true">
                          <img src="https://img.icons8.com/ios-glyphs/50/07b107/hammer.png" />
                        </i>
                        <i className="icon-bargraph abs-icon" aria-hidden="true"></i>
                      </div>
                      <small>Carpentry And Woodworking</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`tab-content ${this.state.selectedTab === 1 ? "d-block" : "d-none"}`}>
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <div className="content-item">
                      <div className="category-icon">
                        <i className="icon-bargraph" aria-hidden="true">
                          <img src="https://img.icons8.com/ios-glyphs/50/07b107/fridge.png" />
                        </i>
                        <i className="icon-bargraph abs-icon" aria-hidden="true"></i>
                      </div>
                      <small>Appliances</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="content-item">
                      <div className="category-icon">
                        <i className="icon-bargraph" aria-hidden="true">
                          <img src="https://img.icons8.com/ios-glyphs/50/07b107/construction-worker.png" />
                        </i>
                        <i className="icon-bargraph abs-icon" aria-hidden="true"></i>
                      </div>
                      <small>Accessibility Construction And Remodels</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="content-item">
                      <div className="category-icon">
                        <i className="icon-bargraph" aria-hidden="true">
                          <img src="https://img.icons8.com/ios-glyphs/50/07b107/hammer.png" />
                        </i>
                        <i className="icon-bargraph abs-icon" aria-hidden="true"></i>
                      </div>
                      <small>Carpentry And Woodworking</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export class HomeCategories extends React.Component {
  state = {
    top: 0,
    bottom: 0,
  };
  render() {
    return (
      <div className="home-categories">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <div className="category">
                  <div className="link_icon">
                    <img src={homeIcon} alt="" />
                  </div>
                  <div className="">Home</div>
                </div>
                <div className="category">
                  <div className="link_icon">
                    <img src={eventsIcon} alt="" />
                  </div>
                  <div className="link_content">Events</div>
                </div>
                <div className="category">
                  <div className="link_icon">
                    <img src={weddingsIcon} alt="" />
                  </div>
                  <div className="link_content">Weddings</div>
                </div>
                <div className="category">
                  <div className="link_icon">
                    <img src={wellnessIcon} alt="" />
                  </div>
                  <div className="link_content">Wellness</div>
                </div>
                <div className="category">
                  <div className="link_icon">
                    <img src={venueIcon} alt="" />
                  </div>
                  <div className="link_content">Venue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class NewPostedJobs extends React.Component {
  render() {
    return (
      <div className="newposted-jobs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-5">
                Latest Posted Jobs <span className="text-color">Near You</span>
              </h1>
              <div className="content">
                <div className="row">
                  <div className="col-lg-1 col-md-2 d-flex justify-content-center mb-2">
                    <div className="thumbnail">Thumbnail</div>
                  </div>
                  <div className="col-lg-8 col-md-7">
                    <p className="job-explain pl-md-4 pl-0">
                      Licensed real estate agent with a passion for teaching.
                      <br />
                      I need a: Photographer
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus alias
                      recusandae enim numquam, <br />
                      For : 08-25-2019 at 2:30 PM To 08-25-2019 at 4:45 PM / Lynn, MA, United States
                    </p>
                  </div>
                  <div className="col-md-3 d-flex align-items-end justify-content-md-end justify-content-center">
                    <div className="price-content text-right mt-3 d-flex d-md-block justify-content-center align-items-center">
                      <h6 className=" font-weight-bold mb-2 mr-5">$500</h6>
                      <button className="button-primary">Place A Bid</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-wrap posted_job">
          <h1>Latest Posted Jobs <span className="text-color">Near You</span></h1>
          <br />
          <div className="latest_job_dis">
          <ul>
            <li>
              <div className="job_av">
                avatar
              </div>
              <div className="job_det_01">
                <div className="job_sub_det_01">
                  <h4>Licensed real estate agent with a passion for teaching.</h4>
                  <h4>I need a: Photographer</h4>
                  <h4>For : 08-25-2019 at 2:30 PM To 08-25-2019 at 4:45 PM / Lynn, MA, United States</h4>
                </div>
                <div className="job_sub_det_02">
                  <div className="job_price">
                    <h4>$500</h4>
                  </div>
                  <button type="button" name="button" className="btn">Place A Bid</button>
                </div>
              </div>
            </li>
          </ul>
          </div>
        </div> */}
      </div>
    );
  }
}

export class HeaderForm extends React.Component {
  state = {
    top: 0,
    bottom: 0,
  };
  render() {
    return (
      <div className="header-form">
        <div className="trans_bg">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex align-items-center">
                <div className="header-search">
                  <h1>World’s Largest Verified Vendors</h1>
                  <p>
                    Find And Hire Local Vendors or Pro Vendors For The Most Unforgettable Moments.
                  </p>
                  <div className="search-box mt-4">
                    <HomeSearchBar {...this.props} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class TopRatedVendors extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    // (function($) {
    //   // Auto-scroll
    //   $("#toprated-carousel").carousel({
    //     interval: 5000,
    //   });
    //   // Control buttons
    //   $(".next").click(function() {
    //     $(".carousel").carousel("next");
    //     return false;
    //   });
    //   $(".prev").click(function() {
    //     $(".carousel").carousel("prev");
    //     return false;
    //   });
    // })($);
  }
  render() {
    return (
      <div className="container toprate-vendor">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-5">Top Rated Vendors</h1>
            <div className="carousel slide position-relative" data-ride="carousel">
              <ul className="carousel-indicators">
                <li data-target="#toprated-carousel" data-slide-to="0" className="active"></li>
                <li data-target="#toprated-carousel" data-slide-to="1"></li>
                <li data-target="#toprated-carousel" data-slide-to="2"></li>
              </ul>
              <div id="toprated-carousel" className="carousel-inner">
                <div className="carousel-item px-2 active">
                  <div className="row">
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                  </div>
                </div>
                <div className="carousel-item px-2">
                  <div className="row">
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                  </div>
                </div>
                <div className="carousel-item px-2">
                  <div className="row">
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                    <div className="col-md-4">
                      <TopRatedVendorCard />
                    </div>
                  </div>
                </div>
              </div>
              <div className="prev" href="javascript:void(0)" data-slide="prev">
                <Icon type="left" className="text-color h3" />
              </div>
              <div className="next" href="javascript:void(0)" data-slide="next">
                <Icon type="right" className="text-color h3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class TopRatedVendorCard extends React.Component {
  render() {
    return (
      <div className="toprate-card">
        <div className="card-avatar">ok</div>
        <h6 className=" font-weight-bold mt-3">Gerard Kasemba</h6>
        <p className=" font-weight-light">Vendor Category</p>
        <p className=" font-weight-light">Montreal, QC, Canada</p>
        <p className="mb-3">
          5.0
          <span className="icon">
            <img src="https://img.icons8.com/material-rounded/15/07b107/star.png" alt="" />
          </span>
          <span className="icon">
            <img src="https://img.icons8.com/material-rounded/15/07b107/star.png" alt="" />
          </span>
          <span className="icon">
            <img src="https://img.icons8.com/material-rounded/15/07b107/star.png" alt="" />
          </span>
          <span className="icon">
            <img src="https://img.icons8.com/material-rounded/15/000000/star.png" alt="" />
          </span>
          <span className="icon">
            <img src="https://img.icons8.com/material-rounded/15/000000/star.png" alt="" />
          </span>
        </p>
        <button type="button" name="button">
          Hire Vendor
        </button>
      </div>
    );
  }
}

export class HomeSearchBar extends React.Component {
  render() {
    return (
      <div className="home-searchbar">
        <input type="search" name="q" className="sq" placeholder="Who do you need to hire" />
        <input type="search" name="q" className="sbtn" placeholder="Zip Code" />
        <button className="button-primary">Get Started</button>
      </div>
    );
  }
}
