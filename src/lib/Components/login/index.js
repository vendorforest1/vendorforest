import React from "react";
import VendorForestHeader from "@Components/inc/header";
import VendorForestFooter from "@Components/inc/footer";

import { Form, Icon, Input, Checkbox } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import { connect } from "react-redux";
import { constants } from "@Shared/constants";

import { fetchLogin } from "./essential";

// @ts-ignore
import globalStyle from "@Components/sass/index.scss";
// @ts-ignore
import localStyle from "./index.scss";

class MainLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // @ts-ignore
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextProps.user && nextProps.user.userObj) {
      if (nextProps.user.userObj.accountType === constants.ACCOUNT_TYPE.VENDOR) {
        this.props.history.push(
          `/${constants.ACCOUNTTYPES[nextProps.user.userObj.accountType]}/findjob`,
        );
      } else {
        this.props.history.push(`/${constants.ACCOUNTTYPES[nextProps.user.userObj.accountType]}`);
      }
    }
  }

  // @ts-ignore
  handleSubmit = async (e) => {
    console.log("handleSubmit!!!");
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // if (!err && !this.props.user && !this.props.pending) {
      if (!err && !this.props.pending) {
        console.log("debug 2");
        this.props.fetchLogin(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-section">
        <VendorForestHeader />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                <div className="shadow form-content">
                  <Form method="POST" onSubmit={this.handleSubmit} className="login-form">
                    <h2 className="text-center mb-5">Login</h2>
                    <Form.Item>
                      {getFieldDecorator("email", {
                        rules: [{ required: true, message: "Please input your username!" }],
                      })(
                        <Input
                          size={"large"}
                          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                          placeholder="Username"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your Password!" }],
                      })(
                        <Input
                          size={"large"}
                          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                          type="password"
                          placeholder="Password"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true,
                      })(<Checkbox>Remember me</Checkbox>)}
                    </Form.Item>
                    <div className="d-flex justify-content-center mb-3">
                      <button
                        className={`button-primary w-100 ${this.props.pending ? "disable" : ""}`}
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <p className="w-100 text-right mb-4">
                      <a className="text-color" href="/resetpass">
                        Forgot password
                      </a>
                    </p>
                    <p className="text-center w-100">
                      Don't you have account?{" "}
                      <a className="text-color" href="/register">
                        register now!
                      </a>
                    </p>
                  </Form>
                  <div className="text-center mt-2">
                    {this.props.error && (
                      <span className="text-danger text-center">{this.props.error}</span>
                    )}
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

const mapStateToProps = (state) => {
  const { error, user, pending } = state.loginReducer;
  return { error, user, pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogin: (payload) => dispatch(fetchLogin(payload)),
  };
};

let WrappedNormalLoginForm = Form.create({
  name: "normal_login",
})(MainLogin);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(globalStyle, localStyle)(WrappedNormalLoginForm));
