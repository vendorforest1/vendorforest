import React from "react";
import { Input, Form, Radio, Select, Card } from "antd";
import { connect } from "react-redux";
import { fetchGetSettings, fetchUpdateBilling, confirmCardSetup } from "./essential";
// import stripe from "stripe";
// import { Elements, injectStripe } from "react-stripe-elements";

class ClientBillingMethod extends React.Component {
  static fetchInitialData() {}

  creditCardInfo = {};

  constructor(props) {
    super(props);
    this.state = {
      number: "",
      firstName: "",
      lastName: "",
      exp_month: "01",
      exp_year: "2020",
      cvc: "",
    };
    // this.stripePayload = new stripe("sk_test_PHS0wV5HZJ41uaZDQsgqHKQp");
    this.saveBillingInfo = this.saveBillingInfo.bind(this);
    this.checkSecurityCode = this.checkSecurityCode.bind(this);
    this.checkCardInfo = this.checkCardInfo.bind(this);
  }

  // componentDidMount() {
  //   this.props.confirmCardSetup();
  // }

  checkCardInfo(rule, value, callback) {
    const form = this.props.form;
    if (value && form.getFieldValue("cardNumber").length < 15) {
      return callback("must be at least 15 digits");
    } else {
      return callback();
    }
  }
  checkSecurityCode(rule, value, callback) {
    const form = this.props.form;
    if (value && form.getFieldValue("securityCode").length < 3) {
      return callback("must be at least 3 digits");
    } else {
      return callback();
    }
  }
  saveBillingInfo(e) {
    e.preventDefault();
    console.log("sds");
    this.props.form.validateFields((err, value) => {
      if (!err && !this.props.pending) {
        const params = {
          number: value.cardNumber,
          firstName: value.firstName,
          lastName: value.lastName,
          exp_month: this.state.expMonth,
          exp_year: this.state.expYear,
          cvc: value.securityCode,
        };
        this.props.confirmCardSetup(params);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched, isSelectOptGroup } = this.props.form;

    const cardNumberError = isFieldTouched("cardNumber") && getFieldError("cardNumber");
    const firstNameError = isFieldTouched("firstName") && getFieldError("firstName");
    const lastNameError = isFieldTouched("lastName") && getFieldError("lastName");
    const securityCodeError = isFieldTouched("securityCode") && getFieldError("securityCode");

    const generateExpireMonthOptions = () => {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month, index) => {
        return (
          <Select.Option key={index} value={`0${month}`.slice(-2)}>
            {`0${month}`.slice(-2)}
          </Select.Option>
        );
      });
    };
    const generateExpireYearOptions = () => {
      const years = new Array(30).fill(0);
      return years.map((year, index) => {
        return (
          <Select.Option key={index} value={2019 + index}>
            {2019 + index}
          </Select.Option>
        );
      });
    };
    return (
      <div className="client-billingmethod">
        <Card
          title="Add New Billing Method"
          style={{
            boxShadow: "0 1px 6px rgba(57,73,76,.35)",
            marginBottom: "50px",
          }}
        >
          <div className="row">
            <div className="col-md-8 mb-5">
              <Radio.Group
                onChange={(e) => {
                  this.setState({
                    billingMethod: e.target.value,
                  });
                }}
                value={this.state.billingMethod}
              >
                <Radio value={0} className="d-block mb-3">
                  Add a Credit Card
                </Radio>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <Form.Item
                      label="Card Number"
                      validateStatus={cardNumberError ? "error" : ""}
                      help={cardNumberError || ""}
                    >
                      {getFieldDecorator("cardNumber", {
                        initialValue: this.state.cardNumber,
                        rules: [
                          {
                            required: true,
                            message: "Please input your card number must be at least 15 digits.",
                            validator: this.checkCardInfo,
                          },
                        ],
                      })(
                        <Input
                          placeholder="Card Number"
                          name="cardNumber"
                          onChange={(value) => {
                            this.setState({
                              cardNumber: value.target.value,
                            });
                          }}
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="First Name"
                      validateStatus={firstNameError ? "error" : ""}
                      help={firstNameError || ""}
                    >
                      {getFieldDecorator("firstName", {
                        initialValue: this.state.firstName,
                        rules: [
                          {
                            required: true,
                            message: "Please input your first name.",
                          },
                        ],
                      })(
                        <Input
                          placeholder="First Name"
                          name="firstName"
                          onChange={(value) => {
                            this.setState({
                              firstName: value.target.value,
                            });
                          }}
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="Last Name"
                      validateStatus={lastNameError ? "error" : ""}
                      help={lastNameError || ""}
                    >
                      {getFieldDecorator("lastName", {
                        initialValue: this.state.lastName,
                        rules: [
                          {
                            required: true,
                            message: "Please input your last name.",
                          },
                        ],
                      })(
                        <Input
                          placeholder="Last Name"
                          name="lastName"
                          onChange={(value) => {
                            this.setState({
                              lastName: value.target.value,
                            });
                          }}
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item label="Expire Month" required>
                      <Select
                        value={String(this.state.expMonth)}
                        onChange={(value) => {
                          this.setState({
                            expMonth: value, //Number(value)
                          });
                        }}
                      >
                        {generateExpireMonthOptions()}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item label="Expire Year" required>
                      <Select
                        value={String(this.state.expYear)}
                        onChange={(value) => {
                          console.log("Select value: ", value);
                          this.setState({
                            expYear: Number(value),
                          });
                        }}
                      >
                        {generateExpireYearOptions()}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item
                      label="Security Code"
                      validateStatus={securityCodeError ? "error" : ""}
                      help={securityCodeError || ""}
                    >
                      {getFieldDecorator("securityCode", {
                        initialValue: this.state.securityCode,
                        rules: [
                          {
                            required: true,
                            message: "Please input your security code. must be at least 3",
                            validator: this.checkSecurityCode,
                          },
                        ],
                      })(
                        <Input
                          placeholder="Security Code"
                          name="securityCode"
                          onChange={(value) => {
                            this.setState({
                              securityCode: value.target.value,
                            });
                          }}
                        />,
                      )}
                    </Form.Item>
                  </div>
                </div>
                <Radio value={1} className="d-block mb-3">
                  Paypal
                </Radio>
                <div className="row mt-4">
                  <div className="col-12 paypal-content">
                    <p className="text-grey mb-3">
                      You’ll be redirected to PayPal to link a verified account.
                    </p>
                    <button className="button-white">Connect to your paypal</button>
                  </div>
                </div>
              </Radio.Group>
            </div>
            <div className="col-12">
              <button className="button-primary" onClick={this.saveBillingInfo}>
                Save
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const ClientBillingMethodForm = Form.create({ name: "client_setting_billingmethod" })(
  ClientBillingMethod,
);

const mapStateToProps = ({ clientSettingsReducer }) => {
  const { error, user, pending } = clientSettingsReducer;
  return {
    error,
    user,
    pending,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchGetSettings,
    fetchUpdateBilling,
    confirmCardSetup,
  },
)(ClientBillingMethodForm);
