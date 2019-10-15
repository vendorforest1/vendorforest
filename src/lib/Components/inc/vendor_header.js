import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import style from "./index.scss";
import store from "store";

const helpMenu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="">
        Help and Support
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="">
        Community and Forums
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="">
        Disputes
      </a>
    </Menu.Item>
  </Menu>
);

const notifiMenu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="">
        <p style={{ maxWidth: "250px", wordWrap: "break-word" }}>
          A payment of $30.83 has been <br />
          applied to your financial account.
        </p>
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="">
        <p style={{ maxWidth: "250px", wordWrap: "break-word" }}>
          A payment of $30.83 has been <br />
          applied to your financial account.
        </p>
      </a>
    </Menu.Item>
  </Menu>
);

const useriMenu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="/vendor/settings">
        <Icon type="setting" />
        &nbsp;&nbsp;Settings
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="/vendor/profile">
        <Icon type="user" />
        &nbsp;&nbsp;Profile
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        rel="noopener noreferrer"
        onClick={() => {
          store.clearAll();
          window.location.href = "/logout";
        }}
      >
        <Icon type="logout" />
        &nbsp;&nbsp;Logout
      </a>
    </Menu.Item>
  </Menu>
);

class VF_VendorHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="top-header">
        <div className="top-main-nav">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex">
                <div className="mr-auto">
                  <div className="top-nav-logo">
                    <img
                      src="http://res.cloudinary.com/lyruntpzo/image/upload/v1508334633/VF_logo_pa8lzd.png"
                      alt="vendorforest.com"
                    />
                  </div>
                </div>
                <div className="menu-content d-none d-xl-flex justify-content-end align-items-center">
                  <a href="/vendor" className="mr-4">
                    DASHBOARD
                  </a>
                  <a href="/vendor/findjob" className="mr-4">
                    JOBS
                  </a>
                  {/* <a href="" className="mr-4">VENDORS</a> */}
                  <a href="/messages/v" className="mr-4">
                    MESSAGES
                  </a>
                  <Dropdown overlay={helpMenu} className="mr-3">
                    <a className="ant-dropdown-link" href="#">
                      <Icon type="question-circle" />
                      &nbsp;
                      <Icon type="down" style={{ fontSize: "8px" }} />
                    </a>
                  </Dropdown>
                  <Dropdown overlay={notifiMenu} className="mr-3">
                    <a className="ant-dropdown-link" href="#">
                      <Icon type="bell" />
                      &nbsp;
                      <Icon type="down" style={{ fontSize: "8px" }} />
                    </a>
                  </Dropdown>
                  <Dropdown overlay={useriMenu}>
                    <a className="ant-dropdown-link" href="#">
                      <Icon type="user" />
                      &nbsp;
                      <Icon type="down" style={{ fontSize: "8px" }} />
                    </a>
                  </Dropdown>
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
                        <a href="/vendor">DASHBOARD</a>
                      </p>
                      <p className=" text-center">
                        <a href="/vendor/findjob">JOBS</a>
                      </p>
                      <p className=" text-center">
                        <a href="">MESSAGES</a>
                      </p>
                      <p className=" text-center">
                        <a href="">HELP</a>
                      </p>
                      <p className=" text-center">
                        <a href="">NOTIFICATION</a>
                      </p>
                      <p className=" text-center">
                        <a href="">SETTINGS</a>
                      </p>
                      <p className=" text-center">
                        <a href="">LOGOUT</a>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(VF_VendorHeader);
