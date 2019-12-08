import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import ClientBillingMethodForm from "./BillingMethodForm";

class ClientBillingMethod extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_t5yr8PtFZ2q8YfuUUuEGcOXM009TZGJItg">
        <Elements>
          <ClientBillingMethodForm />
        </Elements>
      </StripeProvider>
    );
  }
}

export default ClientBillingMethod;
