import React from "react";
import { Icon } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";

import { apiUrl } from "@Shared/constants";
import VendorForestHeader from "@Components/inc/header";
import VendorForestFooter from "@Components/inc/footer";

import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";

class EmailConfirmRequire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: false,
      errorMsg: "",
    };
    this.resendEmail = this.resendEmail.bind(this);
  }

  async resendEmail() {
    if (this.props.match.params.id && !this.state.isPending) {
      this.setState({
        isPending: true,
        errorMsg: undefined,
      });
      return await fetch(`${apiUrl.EMAILSENT}/${this.props.match.params.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          this.setState({ isPending: false });
          if (result.status >= 400) {
            this.setState({
              errorMsg: result.message,
            });
          }
          if (result.status === 401) {
            let that = this;
            setTimeout(() => {
              that.props.history.push("/register");
            }, 3000);
          }
          if (result.status === 402) {
            let that = this;
            setTimeout(() => {
              that.props.history.push("/login");
            }, 3000);
          }
        })
        .catch((err) => {
          this.setState({
            errorMsg: err.message,
          });
        });
    }
  }

  UNSAFE_componentWillMount() {}

  render() {
    return (
      <div className="emailconfirmrequire-section">
        <VendorForestHeader />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="shadow alert-content">
                  <div className="icon mb-3 text-center text-color">
                    <Icon type="exclamation-circle" />
                  </div>
                  <div className="text-center text-grey">
                    We just sent an email to gerardkasemba@gmail.com with instructions for resetting
                    your account password. If you don’t see an email, be sure to check your spam
                    folder.
                    <span
                      className={`ml-4 inline-block text-color pointer d-inline-block ${
                        this.state.isPending ? "text-grey" : ""
                      }`}
                      onClick={this.resendEmail}
                    >
                      Ressend email
                    </span>
                  </div>
                  <div className="mt-2 text-center text-danger">
                    {this.state.errorMsg ? <span>{this.state.errorMsg}</span> : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VendorForestFooter />
      </div>
    );
  }
}

export default withStyles(globalStyle, localStyle)(EmailConfirmRequire);
