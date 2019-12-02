import React from "react";
import HomeSearchBar from "./HomeSearchBar";

class HeaderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      bottom: 0,
    };
  }

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
                    Find And Hire Local Vendors or Pro Vendors For The Most Unforgettable
                    Moments.
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

export default HeaderForm;
