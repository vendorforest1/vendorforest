import React from "react";
import rainbow from "@Components/images/header/pettran.jpg";
import logo from "@Components/images/logo.svg";

class VendorForestFooter extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="mb_m20">
          <div className="footer mb_m20">
            <div className="container">
              <div className="row logo">
                <div className="col-md-3 col-6">
                  <p className="copyright">&copy; 2019 Vendorforest.com, inc.</p>
                </div>
                <div className="col-md-3 col-6"></div>
                <div className="col-md-3 col-6"></div>
                <div className="col-md-3 col-6">
                  <img className="footer-logo" src={logo} alt=" footer" width="300" />
                </div>
              </div>
            </div>
          </div>
          <img src={rainbow} alt="" id="rainbow_bottom" />
        </div>
      </div>
    );
  }
}

export const Footer = VendorForestFooter;

export default VendorForestFooter;
