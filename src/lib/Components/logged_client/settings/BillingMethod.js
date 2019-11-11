import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import ClientBillingMethodForm from "./BillingMethodForm";
import { getPublicKey } from "./essential";

class ClientBillingMethod extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_qD3GtwiIpstGsZ8mt9txbGHm00hg9nYbKK">
        <Elements>
          <ClientBillingMethodForm />
        </Elements>
      </StripeProvider>
    );
  }
}

export default ClientBillingMethod;
