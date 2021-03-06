import React from "react";
import postBig from "@Components/images/bigsvgs/post_big.svg";
import iteractivePost from "@Components/images/smallsvgs/interactive/post.svg";
import interactiveBid from "@Components/images/smallsvgs/interactive/bid.svg";
import bidBig from "@Components/images/bigsvgs/bid_big.svg";
import workBig from "@Components/images/bigsvgs/work_big.svg";
import interactiveWork from "@Components/images/smallsvgs/interactive/work.svg";
import getPaid from "@Components/images/smallsvgs/static/getpaid.svg";
import getPaidBig from "@Components/images/bigsvgs/getpaid_big.svg";

class HowItWorks extends React.Component {
  render() {
    return (
      <div className="how-it-work" id="how_it_works">
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
                          Get qualified proposals within 24 hours. Compare bids, reviews, and
                          prior work. Interview favorites and hire the best fit.
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
                          Use Vendorforest to chat with the vendors, share files, and track
                          project milestones from your desktop or mobile.
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
                          Pay fixed-price and receive invoices through Vendorforest. Only pay
                          for work you authorize.
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

export default HowItWorks;
