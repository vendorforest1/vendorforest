import React from "react";
import rainbow from "@Components/images/header/pettran.jpg";

class VendorForestFooter extends React.Component {
  render() {
    return (
      <div className="mb_m20" style={{ position: "absolute", bottom: "0" }}>
        <div className="footer mb_m20">
          <div className="container">
            <div className="row logo">
              <div className="col-md-3 col-6">
                <p className="copyright">&copy; 2019 Vendorforest.com, inc.</p>
              </div>
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
          </div>
        </div>
        <img src={rainbow} alt="" id="rainbow_bottom" />
      </div>
    );
  }
}

export const Footer = VendorForestFooter;

export default VendorForestFooter;
