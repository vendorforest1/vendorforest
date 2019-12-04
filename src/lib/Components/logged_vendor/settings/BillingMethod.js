import React from "react";
import { Form, Card, Row } from "antd";
import stripeLinkButton from "@Components/images/stripe/str_link_button.png";
import { signupStripe } from "./essential";
import { connect } from "react-redux";

const _process = process ? process : null;

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
    const API_URL = _process && _process.env.API_URL;
    const STRIPE_CLIENT = _process && _process.env.STRIPE_CLIENT;

    const { getFieldError, isFieldTouched } = this.props.form;

    return (
      <div className="vendor-billingmethod">
        {/* <a href="https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://connect.stripe.com/connect/default/oauth/test&client_id=ca_G69qhU4bRaQUrWwoYPRNlzu50gvOEgEy&state=asdwasd2132"><button>Connect to Stripe</button></a> */}
        <Card
          title={<span className="h5 font-weight-bold">Add New Billing Method</span>}
          style={{ marginBottom: "50px" }}
        >
          <div>
            <Row style={{ textAlign: "center" }}>
              <a
                href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${API_URL}/vendor/settings&client_id=${STRIPE_CLIENT}`}
              >
                <button>
                  <img src={stripeLinkButton} alt="" />
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
