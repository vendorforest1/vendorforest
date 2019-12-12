import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import ClientBillingMethodForm from "./BillingMethodForm";

class ClientBillingMethod extends Component {
  render() {
    const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
    return (
      <StripeProvider apiKey={STRIPE_PUBLISHABLE_KEY}>
        <Elements>
          <ClientBillingMethodForm />
        </Elements>
      </StripeProvider>
    );
  }
}

export default ClientBillingMethod;
