// @ts-nocheck
import React from "react";
import { Icon } from "antd";

class Warning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: undefined,
      bill: undefined,
    };
  }
  componentDidMount() {
    if (this.props.data) {
      const account = this.props.data.bsLocation ? true : undefined;
      const billingMethod = this.props.data.stripe_client_id ? true : undefined;
      this.setState({
        account: account,
        bill: billingMethod,
      });
      console.log("in warining.js file = ", this.props.data, account, billingMethod);
    }
  }

  render() {
    return (
      <div>
        {this.state.account === true && this.state.bill === true ? (
          ""
        ) : (
          <div className="row warning">
            <div className="col-md-2 col-sm-12 warning-icon">
              <Icon type="warning" className="icon" theme="filled" />
            </div>
            <div className="col-md-10 col-sm-12 warning-text">
              <h6>The next thing that you need to do after loging in is to:</h6>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  Complete your{" "}
                  <span>
                    <a href="/client/settings">Settings</a>
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
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Warning;
