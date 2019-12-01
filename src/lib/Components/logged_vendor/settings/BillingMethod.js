import React from "react";
import { Input, Form, Radio, Select, Card, Row, Col } from "antd";
import stripeImage from "@Components/images/stripe/stripe.png";
import stripeLinkButton from "@Components/images/stripe/str_link_button.png";
import { signupStripe } from "./essential";
import { connect } from "react-redux";

class VendorBillingMethod extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentMethod: 0,
      cardNumber: "",
      firstName: "",
      lastName: "",
      expireMonth: "01",
      expireYear: "2019",
      securityCode: "",
    };
  }

  goToStripe = () => {
    // alert("stripe");
    // const userEmail = this.props.user.email;
    this.props.signupStripe();
    // process.env.NODE_ENV === "development" && console.log("userEmail is " + userEmail);
  };

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
      <div className="vendor-billingmethod">
        {/* <a href="https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://connect.stripe.com/connect/default/oauth/test&client_id=ca_G69qhU4bRaQUrWwoYPRNlzu50gvOEgEy&state=asdwasd2132"><button>Connect to Stripe</button></a> */}
        <Card
          title={<span className="h5 font-weight-bold">Add New Billing Method</span>}
          style={{ marginBottom: "50px" }}
        >
          <div>
            <Row style={{ textAlign: "center" }}>
              <a href="https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:4444/vendor/settings&client_id=ca_G69qhU4bRaQUrWwoYPRNlzu50gvOEgEy">
                <button>
                  <img src={stripeLinkButton} />
                </button>
              </a>
              {/* <button onClick={ this.goToStripe }>
                <img src={ stripeLinkButton } />
              </button> */}
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ vendorSettingsReducer }) => {
  const { error, user, pending } = vendorSettingsReducer;
  return {
    error,
    user,
    pending,
  };
};

const VendorBillingMethodForm = Form.create({ name: "vendor_setting_billingmethod" })(
  VendorBillingMethod,
);

// export default VendorBillingMethodForm;

// const VendorMyAccountForm = Form.create({ name: "vendor_setting_myaccount" })(VendorMyAccount);

export default connect(mapStateToProps, {
  signupStripe,
})(VendorBillingMethodForm);
