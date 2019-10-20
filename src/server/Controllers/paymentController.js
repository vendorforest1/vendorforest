import stripe from "stripe";
// const crypto = require("crypto");
// //const passport = require('passport');
// const User = require("../models/user.model");
// const Token = require("../models/token.model");
// const Client = require("../models/client.model");
// const Vendor = require("../models/vendor.model");
// const constants = require("../config/constants");

// TODO
// @ts-ignore
export default function(passport) {
  const controllers = {};
  const stripePayload = new stripe("sk_test_PHS0wV5HZJ41uaZDQsgqHKQp");

  console.log("stripePayload");

  // @ts-ignore
  controllers.createStripeCharges = async (req, res, next) => {
    const charges = req.param("charges");
    console.log("before stripe: ", charges);
    // @ts-ignore
    const status = await stripePayload.charges.create({
      amount: charges,
      currency: "usd",
      source: "tok_amex", // obtained with Stripe.js
      metadata: { order_id: "6735" },
    });
    next();
  };

  // @ts-ignore
  controllers.createToken = async (req, res) => {
    stripePayload.tokens.create(
      {
        card: {
          //TODO get this from user db.table
          number: "4242424242424242",
          exp_month: 12,
          exp_year: 2020,
          cvc: "123",
        },
      },
      async function(err, token) {
        // asynchronously called
        if (err) {
          console.log("Error happened while creating a Stripe Token: ", err);
        }

        console.log("Token: ", token);

        res.status(200).send(token.id);
      },
    );
  };

  // @ts-ignore
  controllers.createStripeAccount = async (req, res, next) => {
    stripePayload.tokens.create(
      {
        card: {
          //TODO get this from user db.table
          number: "4242424242424242",
          exp_month: 12,
          exp_year: 2020,
          cvc: "123",
        },
      },
      // @ts-ignore
      async function(err, token) {
        // asynchronously called
        //TODO: get customer if exists otherwise
        // create customer
        console.log("token: ", token);
        // @ts-ignore
        const customer = await stripePayload.customers.create(
          {
            email: "jenny.rosen@example.com",
            source: token.id,
          },
          // @ts-ignore
          (err, customer) => {
            console.log("customers: ", customer);
          },
        );
      },
    );
  };
  //client deposits money into an escrow account
  // controllers.depositMoney = async (req, res, next) => {
  //   await User.findById(req.user._id)
  //     .populate("client")
  //     .then(async user => {})
  //     .catch(error => {});
  // };
  return controllers;
}
