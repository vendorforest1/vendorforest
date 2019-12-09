import React from "react";
import { Menu, Dropdown, Icon, Badge, Tooltip } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import style from "./index.scss";
import rainbow from "@Components/images/header/pettran.jpg";
import { getNotification, logout } from "./essential";
import { connect } from "react-redux";
import configureStore from "@Shared/configureStore";
import { withRouter } from "react-router";

const { persistor } = configureStore();

class VendorForestClientHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getNotification();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleIcon = () => {};
  handleLogout = () => {
    this.props.logout();
    persistor.pause();
    persistor
      .purge()
      .then(() => {
        return persistor.flush();
      })
      .then(() => {
        persistor.pause();
      });
  };
  notifiMenu = () => {
    if (!this.props.notification) {
      return "";
    }
    return this.props.notification.map((noti, index) => {
      return (
        <Menu.Item key={index}>
          <a rel="noopener noreferrer" href="/#">
            <p style={{ maxWidth: "350px", wordWrap: "break-word" }}>
              {noti.isRead === false ? (
                <Badge dot>
                  <Icon type="notification" />
                </Badge>
              ) : (
                ""
              )}
              &nbsp;
              {noti.notificationMsg} <br />
              {noti.time}
            </p>
          </a>
        </Menu.Item>
      );
    });
  };
  render() {
    const helpMenu = (
      <Menu>
        <Menu.Item>
          <a rel="noopener noreferrer" href="/#">
            Help and Support
          </a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="/#">
            Community and Forums
          </a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="/#">
            Disputes
          </a>
        </Menu.Item>
      </Menu>
    );
    const useriMenu = (
      <Menu>
        <Menu.Item>
          <a rel="noopener noreferrer" href="/client/settings">
            <Icon type="setting" />
            &nbsp;&nbsp;Settings
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => this.handleLogout()} href="/login">
            <Icon type="logout" />
            &nbsp;&nbsp;LOGOUT
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="top-header">
        <img src={rainbow} alt="" id="rainbow_top" />
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
                  <a href="/client" className="mr-4">
                    DASHBOARD
                  </a>
                  <a href="/findvendors" className="mr-4">
                    VENDORS
                  </a>
                  <a href="/messages/c" className="mr-4">
                    MESSAGES
                  </a>
                  <Dropdown overlay={helpMenu} className="mr-3">
                    <a className="ant-dropdown-link" href="#/">
                      <Icon type="question-circle" />
                      &nbsp;
                      <Icon type="down" style={{ fontSize: "8px" }} />
                    </a>
                  </Dropdown>
                  <Dropdown
                    overlay={<Menu onClick={this.handleIcon}>{this.notifiMenu()}</Menu>}
                    className="mr-3"
                  >
                    <a className="ant-dropdown-link" href="#/">
                      <Icon type="bell" />
                      &nbsp;
                      <Icon type="down" style={{ fontSize: "8px" }} />
                    </a>
                  </Dropdown>
                  <Dropdown overlay={useriMenu}>
                    <a className="ant-dropdown-link" href="#/">
                      <Icon type="user" />
                      &nbsp;
                      <Icon type="down" style={{ fontSize: "8px" }} />
                    </a>
                  </Dropdown>
                </div>
                <div className="menu-hamburger d-xl-none d-block">
                  <div onClick={this.toggle} className="text-right">
                    {this.state.isOpen ? (
                      <img src="https://img.icons8.com/ios/40/000000/multiply.png" alt="" />
                    ) : (
                      <i className="icon">
                        <img src="https://img.icons8.com/ios/30/000000/menu.png" alt="" />
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
                        <a href="/client">DASHBOARD</a>
                      </p>
                      <p className=" text-center">
                        <a href="/findvendors">VENDORS</a>
                      </p>
                      <p className=" text-center">
                        <a href="/messages/c">MESSAGES</a>
                      </p>
                      <p className=" text-center">
                        <a href="#/">HELP</a>
                      </p>
                      <p className=" text-center">
                        <a href="#/">NOTIFICATION</a>
                      </p>
                      <p className=" text-center">
                        <a href="/client/settings">SETTINGS</a>
                      </p>
                      <p className=" text-center">
                        <a onClick={() => this.handleLogout()} href="/login">
                          <Icon type="logout" />
                          &nbsp;&nbsp;LOGOUT
                        </a>
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
const mapStateToProps = ({ headerNotiReducer, loginReducer }) => {
  const { notification } = headerNotiReducer;
  const { user } = loginReducer;
  return {
    notification,
    user,
  };
};

export default connect(mapStateToProps, { getNotification, logout })(
  withStyles(style)(withRouter(VendorForestClientHeader)),
);
