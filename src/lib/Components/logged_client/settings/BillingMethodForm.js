import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import { Input, Form, Radio, Select, Card, message, Icon } from "antd";
import { getClientId, updateClientId, getCardDigits } from "./essential";
import { connect } from "react-redux";
class ClientBilling extends Component {
  static fetchInitialData() {}
  client_secret = "";
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
      state: null,
      clientSecret: null,
      pendingBtn: false,
      cardDigits: undefined,
      isStripe: undefined,
    };

    // this.stripePayload = new stripe("sk_test_PHS0wV5HZJ41uaZDQsgqHKQp");
    this.saveBillingInfo = this.saveBillingInfo.bind(this);
    this.checkSecurityCode = this.checkSecurityCode.bind(this);
    this.checkCardInfo = this.checkCardInfo.bind(this);
  }
  componentDidMount() {
    this.fetchCard();
    if (this.props.user.stripeClientId) {
      this.setState({
        isStripe: true,
      });
    } else {
      this.setState({
        isStripe: false,
      });
    }
  }
  async fetchCard() {
    getCardDigits()
      .then((data) => {
        this.setState({
          cardDigits: data.digits,
        });
      })
      .catch((error) => {
        message.warning(error.message);
      });
  }
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
  async saveBillingInfo(e) {
    e.preventDefault();
    if (this.props.stripe) {
      this.setState({
        pendingBtn: true,
      });
      this.props.stripe
        .createToken({ type: "card", name: this.state.firstName + this.state.lastName })
        .then((payload) => {
          if (!payload || !payload.token) {
            throw Error("something went wrong with payload " + payload);
          }
          if (this.state.isStripe === false) {
            this.stripeRegister(payload.token.id);
          } else {
            this.stripeUpdate(payload.token.id);
          }
        })
        .catch((err) => message.error(err.message));
    } else {
      message.error("Stripe.js hasn't loaded yet.");
    }
  }
  async stripeRegister(params) {
    getClientId(params)
      .then((data) => {
        message.success(data.message);
        this.setState({
          pendingBtn: false,
        });
      })
      .catch((error) => {
        this.setState({
          pendingBtn: false,
        });
        process.env.NODE_ENV === "development" && console.log(error);
        message.warning(error.message);
      });
  }
  async stripeUpdate(params) {
    updateClientId(params)
      .then((data) => {
        message.success(data.message);
        this.setState({
          pendingBtn: false,
        });
      })
      .catch((error) => {
        this.setState({
          pendingBtn: false,
        });
        process.env.NODE_ENV === "development" && console.log(error);
        message.warning(error.message);
      });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched,
      isSelectOptGroup,
    } = this.props.form;

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
    var styles = {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
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
            {/* {console.log("true or false =====", this.state.isStripe)} */}
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
                    <CardElement className="sr-input sr-card-element" style={styles} />
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
                </div>
              </Radio.Group>
            </div>
            {this.state.isStripe === true ? (
              <div className="col-md-4 mb-5">
                <h6 style={{ textAlign: "center", fontWeight: "bolder", color: "#07b107" }}>
                  Last 4digits of your card
                </h6>
                <p style={{ textAlign: "center", paddingTop: "5%", fontWeight: "bolder" }}>
                  XXXX-XXXX-XXXX-{this.state.cardDigits}
                </p>
              </div>
            ) : (
              ""
            )}
            {this.props.user && (
              <div className="col-12">
                {this.state.isStripe === false ? (
                  <button
                    className={`button-primary ${
                      this.state.pendingBtn === true ? "disable" : ""
                    }`}
                    onClick={this.saveBillingInfo}
                  >
                    Save &nbsp;
                    {this.state.pendingBtn && <Icon type="sync" spin />}
                  </button>
                ) : (
                  <button
                    className={`button-primary ${
                      this.state.pendingBtn === true ? "disable" : ""
                    }`}
                    onClick={this.saveBillingInfo}
                  >
                    Update &nbsp;
                    {this.state.pendingBtn && <Icon type="sync" spin />}
                  </button>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }
}

const ClientBillingMethodForm = Form.create({ name: "client_setting_billingmethod" })(
  ClientBilling,
);
const mapStateToProps = ({ clientSettingsReducer }) => {
  const { error, pending, user } = clientSettingsReducer;
  return {
    error,
    user,
    pending,
  };
};

export default connect(mapStateToProps, { getClientId, updateClientId, getCardDigits })(
  injectStripe(ClientBillingMethodForm),
);
