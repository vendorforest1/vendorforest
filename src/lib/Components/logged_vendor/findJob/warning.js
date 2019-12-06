// @ts-nocheck
import React from "react";
import { Icon } from "antd";

class Warning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: undefined,
      company: undefined,
      bill: undefined,
      service: undefined,
    };
  }
  componentDidMount() {
    if (this.props.data) {
      const account = this.props.data.bsLocation ? true : undefined;
      const billingMethod = this.props.data.connectedAccountId ? true : undefined;
      const company = this.props.data.vendor.company ? true : undefined;
      const service = this.props.data.vendor.service ? true : undefined;
      this.setState({
        account: account,
        company: company,
        bill: billingMethod,
        service: service,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.account === true &&
        this.state.company === true &&
        this.state.bill === true &&
        this.state.service === true ? (
          ""
        ) : (
          <div className="row warning">
            <div className="col-md-2 col-sm-12 warning-icon">
              <Icon type="warning" className="icon" theme="filled" />
            </div>
            <div className="col-md-10 col-sm-12 warning-text">
              <h6>The next thing that you need to do after loging in is to:</h6>
              <ol>
                <li>
                  Complete your{" "}
                  <span>
                    <a href="/vendor/settings">Settings</a>
                  </span>
                  <ul>
                    <li>
                      My accout{" "}
                      {this.state.account === true ? (
                        <span>
                          <Icon type="check" className="check" />
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      Company Info{" "}
                      {this.state.company === true ? (
                        <span>
                          <Icon type="check" className="check" />
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      Billing Method{" "}
                      {this.state.bill === true ? (
                        <span>
                          <Icon type="check" className="check" />
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li>
                <li>
                  Complete your{" "}
                  <span>
                    <a href="/vendor/profile">Profile</a>
                  </span>
                  <ul>
                    <li>
                      Services{" "}
                      {this.state.service === true ? (
                        <span>
                          <Icon type="check" className="check" />
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Warning;
