// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { Input, Form, Card, message, Icon } from "antd";
import { fetchResetPass, verifyLink } from "./essential";
import { Header } from "@Components/inc/header";
import { Footer } from "@Components/inc/footer";
import { withRouter } from "react-router";

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPass: "",
      newPass: "",
      repeatPass: "",
    };
  }
  resetPass = async (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && !this.props.pending) {
        process.env.NODE_ENV === "development" && console.log(values);
        this.props.fetchResetPass(values);
      }
    });
  };

  componentDidMount() {
    const { token } = this.props.match.params;
    this.props.verifyLink(token);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      console.log(("error: ", props.error));
      setImmediate(() => {
        message.error(props.error);
      }, 3600);
      props.history.push("/404");
    }
    // if (props.success) {
    //   props.history.push("/login");
    // }
    return {
      //...state,
      error: props.error,
      success: props.success,
      pending: props.pending,
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    console.log("", this.props);
    return (
      <div className="resetpass-section">
        <Header />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-8 col-md-10 col-12 offset-xl-3 offset-lg-3 offset-md-1  offset-0">
                <div className="shadow form-content">
                  {this.state.pending && <Icon type="sync" spin />}
                  <div className="client-security">
                    <Card
                      title="Password & security"
                      style={{
                        boxShadow: "0 1px 6px rgba(57,73,76,.35)",
                        marginBottom: "50px",
                      }}
                    >
                      <Form layout="vertical" onSubmit={this.resetPass}>
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <Form.Item label="Old Password">
                              {getFieldDecorator("oldPass", {
                                initialValue: this.state.oldPass, //solution
                                rules: [
                                  { required: true, message: "Please input Old Password" },
                                ],
                              })(
                                <Input.Password
                                  placeholder="Old Password"
                                  name="oldPass"
                                  size={"large"}
                                />,
                              )}
                            </Form.Item>
                          </div>
                          <div className="col-md-6"></div>
                          <div className="col-md-6 col-sm-12">
                            <Form.Item label="New Password">
                              {getFieldDecorator("newPass", {
                                initialValue: this.state.newPass, //solution
                                rules: [
                                  { required: true, message: "Please input New Password" },
                                ],
                              })(
                                <Input.Password
                                  placeholder="New Password"
                                  name="newPass"
                                  size={"large"}
                                />,
                              )}
                            </Form.Item>
                          </div>
                          <div className="col-md-6"></div>
                          <div className="col-md-6">
                            <Form.Item label="Repeat Password">
                              {getFieldDecorator("repeatPass", {
                                initialValue: this.state.repeatPass, //solution
                                rules: [
                                  { required: true, message: "Please input Repeat Password" },
                                ],
                              })(
                                <Input.Password
                                  placeholder="Repeat Passwords"
                                  name="repeatPass"
                                  size={"large"}
                                />,
                              )}
                            </Form.Item>
                          </div>
                          <div className="col-12 d-flex justify-content-start">
                            <button
                              className={`button-primary ${
                                this.props.pending ? "disable" : ""
                              }`}
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </Form>
                    </Card>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const PasswordResetForm = Form.create({ name: "client_setting_security" })(PasswordReset);

const mapStateToProps = ({ ForgotPasswordReducer }) => {
  const { error, success, pending } = ForgotPasswordReducer;
  return {
    error,
    success,
    pending,
  };
};

export const ForgotPassword = connect(mapStateToProps, {
  fetchResetPass,
  verifyLink,
})(withRouter(PasswordResetForm));
