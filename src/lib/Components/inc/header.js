import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import style from "./index.scss";
import { connect } from "react-redux";
import createStore from "@Shared/configureStore";
import { ContextConsumer } from "@Shared/SharedContext";

class VendorForestHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this.store = createStore().persistor;
    this.toggle = this.toggle.bind(this);
    this.getVenderForestHeader = this.getVenderForestHeader.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  getVenderForestHeader() {
    const unSigned = (
      <div className="top-header">
        <div className="top-small-nav d-lg-block d-none">
          <div className="container">
            <div className="row">
              <div className="col-8 d-flex justify-content-start">
                <small className="mr-4">
                  <i className="icon">
                    <img src="https://img.icons8.com/ios-glyphs/15/000000/marker.png" />
                  </i>
                  Lynn,Massachusetts,US{" "}
                </small>
                <small>
                  <i className="icon">
                    <img src="https://img.icons8.com/ios-glyphs/15/000000/new-post.png" />
                  </i>
                  Info@Vendorforest.Com
                </small>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <a href="/login">
                  <small>Login</small>
                </a>
                <span className="mx-4">or</span>
                <a href="/register">
                  <small>Register</small>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="top-main-nav">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex">
                <div className="mr-auto">
                  <div className="top-nav-logo">
                    <a href="/">
                      <img
                        src="https://res.cloudinary.com/lyruntpzo/image/upload/v1508334633/VF_logo_pa8lzd.png"
                        alt="vendorforest.com"
                      />
                    </a>
                  </div>
                </div>
                <div className="menu-content d-none d-xl-flex justify-content-end align-items-center">
                  <a href="#how_it_works" className="mr-4">
                    HOW IT WORKS
                  </a>
                  <a href="/login" className="mr-4">
                    POST A JOB
                  </a>
                  <a role="button" href="/register" className="button-primary">
                    <i className="icon">
                      <img src="https://img.icons8.com/ios-glyphs/15/ffffff/bookmark-ribbon.png" />
                    </i>
                    JOIN AS A VENDOR
                  </a>
                </div>
                <div className="menu-hamburger d-xl-none d-block">
                  <div onClick={this.toggle} className="text-right">
                    {this.state.isOpen ? (
                      <img src="https://img.icons8.com/ios/40/000000/multiply.png" />
                    ) : (
                      <i className="icon">
                        <img src="https://img.icons8.com/ios/30/000000/menu.png" />
                      </i>
                    )}
                  </div>
                </div>
              </div>
              {this.state.isOpen && (
                <div className="col-12 d-flex justify-content-center d-xl-none d-block">
                  <div className="w-100">
                    <div className="menu-hamburger-content w-100">
                      <p className=" text-center">
                        <a href="/login">LOGIN</a>
                      </p>
                      <p className=" text-center">
                        <a href="/register">REGISTER</a>
                      </p>
                      <p className=" text-center">
                        <a href="#how-it-works">HOW IT WORKS</a>
                      </p>
                      <p className=" text-center">
                        <a href="">POST A JOB</a>
                      </p>
                      <a role="button" href="/registration" className="button-primary">
                        <i className="icon">
                          <img src="https://img.icons8.com/ios-glyphs/15/ffffff/bookmark-ribbon.png" />
                        </i>
                        JOIN AS A VENDOR
                      </a>
                    </div>
                    {/* <div className="d-flex justify-content-center mb-4"><SearchBar/></div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <ContextConsumer>
        {({ context }) => {
          console.log("context: ", context);
          return unSigned;
        }}
      </ContextConsumer>
    );
    // if(this.props.user && this.props.user.type)
    // return unSigned;
  }

  render() {
    return this.getVenderForestHeader();
  }
}

const mapStateToProps = ({ loginReducer }) => {
  const { user } = loginReducer;
  return {
    user,
  };
};

export default connect(
  mapStateToProps,
  {},
)(withStyles(style)(VendorForestHeader));

// export default withStyles(style)(VendorForestHeader);

export class SearchBar extends React.Component {
  render() {
    return (
      <div className="searchbar">
        <input type="search" name="q" className="sq" placeholder="Who do you need to hire" />
        <input type="search" name="q" className="sbtn" placeholder="Zip Code" />
        <button className="button-primary">Get Started</button>
      </div>
    );
  }
}
