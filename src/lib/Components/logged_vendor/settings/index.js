import React from "react";
import { connect } from "react-redux";
import { Select, Icon, message } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import VF_VendorHeader from "@Components/inc/vendor_header";
import VF_Footer from "@Components/inc/footer";
import VendorMyAccount from "./MyAccount";
import VendorCompanyInfo from "./CompanyInfo";
import VendorSecurity from "./Security";
import VendorBillingMethod from "./BillingMethod";
import VendorNotification from "./Notification";
import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";

import { fetchGetInitData } from "./essential";
const { Option } = Select;

const contents = [
  <div className="w-100">
    <VendorMyAccount />
  </div>,
  <div className="w-100">
    <VendorCompanyInfo />
  </div>,
  <div className="w-100">
    <VendorSecurity />
  </div>,
  <div className="w-100">
    <VendorBillingMethod />
  </div>,
  <div className="w-100">
    <VendorNotification />
  </div>,
];

class VendorSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: 0,
    };
    this.selectMenu = this.selectMenu.bind(this);
  }

  componentDidMount() {
    this.props.fetchGetInitData();
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.success && newProps.success) {
      message.success(newProps.success);
    }
    if (!this.props.error && newProps.error) {
      message.error(newProps.error);
    }
  }

  selectMenu(index) {
    this.setState({
      selectedMenu: index,
    });
  }

  render() {
    return (
      <div id="vendor-settings">
        <VF_VendorHeader />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="vendor-settings">
                <div className="content-wrap">
                  <div className="side-section">
                    <div className="content">
                      <ul>
                        <li
                          onClick={() => {
                            this.selectMenu(0);
                          }}
                          className={this.state.selectedMenu === 0 ? "active" : ""}
                        >
                          My Account
                        </li>
                        <li
                          onClick={() => {
                            this.selectMenu(1);
                          }}
                          className={this.state.selectedMenu === 1 ? "active" : ""}
                        >
                          Company Info
                        </li>
                        <li
                          onClick={() => {
                            this.selectMenu(2);
                          }}
                          className={this.state.selectedMenu === 2 ? "active" : ""}
                        >
                          Password & Security
                        </li>
                        {/* <li onClick={()=>{this.selectMenu(3)}} className={this.state.selectedMenu === 3 ? 'active' : ''}>Teams</li> */}
                        <li
                          onClick={() => {
                            this.selectMenu(3);
                          }}
                          className={this.state.selectedMenu === 3 ? "active" : ""}
                        >
                          Billing Methods
                        </li>
                        <li
                          onClick={() => {
                            this.selectMenu(4);
                          }}
                          className={this.state.selectedMenu === 4 ? "active" : ""}
                        >
                          Notiffication Settings
                        </li>
                      </ul>
                      <div className="w-100 select-menu">
                        <Select
                          value={String(this.state.selectedMenu)}
                          style={{ width: "100%" }}
                          onChange={(value) => {
                            this.selectMenu(Number(value));
                          }}
                        >
                          <Option value="0">My Account</Option>
                          <Option value="1">Company Info</Option>
                          <Option value="2">Password & Security</Option>
                          {/* <Option value="3">Teams</Option> */}
                          <Option value="3">Billing Methods</Option>
                          <Option value="4">Notiffication Settings</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <div className="row">
                      <div className="col-12">
                        {!this.props.user && this.props.pending && (
                          <div className="text-center loading">
                            <Icon type="sync" spin />
                          </div>
                        )}
                        {this.props.user && <div>{contents[this.state.selectedMenu]}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VF_Footer />
      </div>
    );
  }
  w;
}

const mapStateToProps = ({ vendorSettingsReducer }) => {
  return ({ error, user, pending } = vendorSettingsReducer);
};

export default connect(
  mapStateToProps,
  {
    fetchGetInitData,
  },
)(withStyles(globalStyle, localStyle)(VendorSettings));
