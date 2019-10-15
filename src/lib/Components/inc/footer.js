import React from "react";

class VendorForestFooter extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="footer-logo"
                src="http://res.cloudinary.com/lyruntpzo/image/upload/v1508334633/VF_logo_pa8lzd.png"
                alt="image description"
                width="300"
              />
            </div>
            <div className="col-md-3 col-6">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="">About Us</a>
                </li>
                <li>
                  <a href="">Careers</a>
                </li>
                <li>
                  <a href="">Press</a>
                </li>
                <li>
                  <a href="">Blog</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h3>Clients</h3>
              <ul>
                <li>
                  <a href="">How it works</a>
                </li>
                <li>
                  <a href="">Sign up</a>
                </li>
                <li>
                  <a href="">Services near you</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h3>Vendors</h3>
              <ul>
                <li>
                  <a href="">How it works</a>
                </li>
                <li>
                  <a href="">Sign up</a>
                </li>
                <li>
                  <a href="">Community</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h3>Supports</h3>
              <ul>
                <li>
                  <a href="">Help</a>
                </li>
                <li>
                  <a href="">Safety</a>
                </li>
                <li>
                  <a href="">Term of Use</a>
                </li>
                <li>
                  <a href="">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VendorForestFooter;
