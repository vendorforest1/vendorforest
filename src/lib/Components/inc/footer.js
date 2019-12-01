import React from "react";
import rainbow from "@Components/images/header/pettran.jpg";

class VendorForestFooter extends React.Component {
  render() {
    return (
      <div className="mb_m20">
        <div className="footer mb_m20">
          <div className="container">
            <div className="row logo">
              <div className="col-md-3 col-6">&copy; 2019 Vendorforest.com, inc.</div>
              <div className="col-md-3 col-6"></div>
              <div className="col-md-3 col-6"></div>
              <div className="col-md-3 col-6">
                <img
                  className="footer-logo"
                  src="https://res.cloudinary.com/lyruntpzo/image/upload/v1508334633/VF_logo_pa8lzd.png"
                  alt=" footer"
                  width="300"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-6">
                <h3>Company</h3>
                <ul>
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Press</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div className="col-md-3 col-6">
                <h3>Clients</h3>
                <ul>
                  <li>How it works</li>
                  <li>Sign up</li>
                  <li>Services near you</li>
                </ul>
              </div>
              <div className="col-md-3 col-6">
                <h3>Vendors</h3>
                <ul>
                  <li>How it works</li>
                  <li>Sign up</li>
                  <li>Community</li>
                </ul>
              </div>
              <div className="col-md-3 col-6">
                <h3>Supports</h3>
                <ul>
                  <li>Help</li>
                  <li>Safety</li>
                  <li>Term of Use</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <img src={rainbow} alt="" id="rainbow_bottom" />
      </div>
    );
  }
}

export default VendorForestFooter;
