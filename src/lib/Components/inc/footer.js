import React from "react";
import rainbow from "@Components/images/header/pettran.jpg";
import logo from "@Components/images/logo.svg";
import facebook from "@Components/images/social-media-icon/facebook.svg";
import instagram from "@Components/images/social-media-icon/instagram.svg";
import twitter from "@Components/images/social-media-icon/twitter.svg";

class VendorForestFooter extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="mb_m20">
          <div className="footer mb_m20">
            <div className="container">
              {/* <div className="row logo">
                <div className="col-md-3 col-6">
                  <p className="copyright">&copy; 2019 Vendorforest.com, inc.</p>
                </div>
                <div className="col-md-3 col-6"></div>
                <div className="col-md-3 col-6"></div>
                <div className="col-md-3 col-6">
                  <img className="footer-logo" src={logo} alt=" footer" width="300" />
                </div>
              </div> */}
              <div className="row">
                <ul className="info">
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="">Feedback</a>
                  </li>
                  <li>
                    <a href="">Term&Privacy</a>
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <ul>
                    <li className="social">
                      <span className="image-margin">
                        <img src={facebook} alt="facebook" width="40" />
                      </span>
                      <span className="image-margin">
                        <img src={twitter} alt="twitter" width="40" />
                      </span>
                      <span className="image-margin">
                        <img src={instagram} alt="instagram" width="40" />
                      </span>
                    </li>
                    <li className="social">(a)2019 VendorForest.com, inc.</li>
                  </ul>
                </div>
                <div className="col-md-4"></div>
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
