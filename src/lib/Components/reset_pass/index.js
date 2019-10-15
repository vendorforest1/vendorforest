import React from "react";
import { Input, Form } from "antd";

import moment from "moment";
import withStyles from "isomorphic-style-loader/withStyles";
import VF_Header from "@Components/inc/header";
import VF_Footer from "@Components/inc/footer";
import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";

class ResetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code: "",
    };
  }

  componentWillMount() {}

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched, isSelectOptGroup } = this.props.form;

    const emailError = isFieldTouched("email") && getFieldError("email");
    const codeError = isFieldTouched("code") && getFieldError("code");

    return (
      <div className="resetpass-section">
        <VF_Header />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-8 col-md-10 col-12 offset-xl-3 offset-lg-3 offset-md-1  offset-0">
                <div className="shadow form-content">
                  <Form layout="vertical">
                    <h2 className="text-center mb-5">Reset your password</h2>
                    <Form.Item
                      label="Email"
                      validateStatus={emailError ? "error" : ""}
                      help={emailError || ""}
                    >
                      {getFieldDecorator("email", {
                        initialValue: this.state.email,
                        rules: [{ required: true, message: "Please input your email." }],
                      })(
                        <Input
                          placeholder="Email"
                          name="email"
                          onChange={(value) => {
                            this.setState({
                              email: value.target.value,
                            });
                          }}
                        />,
                      )}
                    </Form.Item>
                    <Form.Item
                      label="Validation Code"
                      validateStatus={codeError ? "error" : ""}
                      help={codeError || ""}
                    >
                      {getFieldDecorator("code", {
                        initialValue: this.state.code,
                        rules: [{ required: true, message: "Please enter the Code Shown Below." }],
                      })(
                        <Input
                          placeholder="Validation Code"
                          name="code"
                          onChange={(value) => {
                            this.setState({
                              code: value.target.value,
                            });
                          }}
                        />,
                      )}
                    </Form.Item>
                    <div className=" border w-100 h1 text-center font-italic bg-light">AFcGkm</div>
                    <div className="d-flex justify-content-center mt-5">
                      <button className="button-primary">Send reset email</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VF_Footer />
      </div>
    );
  }
}

const ResetPassForm = Form.create({ name: "forgot-pass-form" })(ResetPass);
export default withStyles(globalStyle, localStyle)(ResetPassForm);
