import getEnv, { constants } from "@Config/index";
import User from "@Models/user.model";
import Client from "@Models/client.model";
// import Token from "../models/token.model";
import { async } from "q";

const env = getEnv();
const stripe = require("stripe")(env.STRIPE_SECRET_KEY);

export default () => {
  const controllers = {};
  // const stripePayload = new stripe("sk_test_PHS0wV5HZJ41uaZDQsgqHKQp");

  //client deposits money into an escrow account
  controllers.depositMoney = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("client")
      .then(async (user) => {})
      .catch((error) => {});
  };

  controllers.getPubKey = async (req, res) => {
    const stripePubKey = env.CLIENT_ID;
    console.log(stripePubKey);
    return res.json({ pubKey: stripePubKey });
  };

  controllers.getSetupIntent = async (req, res) => {
    const intent = await stripe.setupIntents.create();
    return res.json({ client_secret: intent.client_secret });
  };

  controllers.getClientId = async (req, res) => {
    console.log("Here is backend");
    await stripe.customers
      .create({
        source: req.body.token_id,
        email: req.user.email,
      })
      .then((result) => {
        console.log(result.id);
        const stripe_client_id = {
          stripe_client_id: result.id,
        };
        try {
          User.findOneAndUpdate(
            {
              email: req.user.email,
            },
            stripe_client_id,
            {
              new: true,
            },
          ).then(
            console.log("Your Stripe Client Id is saved."),
            res.redirect(`/${constants.ACCOUNTTYPES[req.user.accountType]}/settings`),
          );
        } catch (error) {
          console.log(error);
        }
      });
  };

  controllers.getClient = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("client")
      .then(async (user) => {
        if (!user) {
          return res.status(401).json({
            status: 401,
            message:
              env.MODE === "development"
                ? `User ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: user,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  //client updates account billing information
  controllers.updateBillingInformation = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("client")
      .then(async (user) => {
        if (!user) {
          return res.status(401).json({
            status: 401,
            message:
              env.MODE === "development"
                ? `User ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        console.log("updateBillingInformation ", req.body);
        const _card = {
          card: {
            //TODO get this from user db.table
            number: req.body.number,
            exp_month: req.body.exp_month,
            exp_year: req.body.exp_year,
            cvc: req.body.cvc,
          },
        };
        //TODO IF STRIPE
        stripePayload.tokens.create(
          {
            // @ts-ignore
            card: {
              number: req.body.number,
              exp_month: req.body.exp_month,
              exp_year: req.body.exp_year,
              cvc: req.body.cvc,
            },
          },
          async function(err, token) {
            // console.log("err: ", err, "token: ", token, " user ", user);
            if (err) {
              return res.status(400).json({
                status: 400,
                data: user,
                message: err.message,
              });
            }
            //TODO token has the object we need to store!!!
            const customer = await this.stripePayload.customers.create(
              {
                email: user.email,
                source: token.id,
              },
              (err, customer) => {
                if (err) {
                  return res.status(400).json({
                    status: 400,
                    data: user,
                    message: err.message,
                  });
                }
                // console.log("customers: ", customer);
                return null;
              },
            );
          },
        );
        // await Client.findOneAndUpdate(
        //   {
        //     _id: user.client._id,
        //   },
        //   {
        //     billingMethod: req.body.billingMethod,
        //     creditCard: {
        //       ...req.body,
        //     },
        //   },
        //   {
        //     new: true,
        //   },
        // )
        //   .then(async (client) => {
        //     console.log("resolve client!!! ", client);
        //     if (!client) {
        //       return res.status(401).json({
        //         status: 401,
        //         message:
        //           env.MODE === "development"
        //             ? `Client ${constants.DEV_EMPTYDOC_MSG}`
        //             : constants.PROD_COMMONERROR_MSG,
        //       });
        //     }
        //     user.client = client;
        // return res.status(200).json({
        //   status: 200,
        //   data: user,
        //   message: "Billing information has been updated",
        // });
        //   })
        //   .catch((error) => {
        //     throw new Error(error.message);
        //   });
      })
      .catch((error) => {});
  };

  controllers.updateNotifySettings = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("client")
      .then(async (user) => {
        if (!user) {
          return res.status(401).json({
            status: 401,
            message:
              env.MODE === "development"
                ? `User ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        await Client.findOneAndUpdate(
          {
            _id: user.client._id,
          },
          {
            notification: {
              ...user.client.notification,
              ...req.body,
            },
          },
          {
            new: true,
          },
        )
          .then(async (client) => {
            if (!client) {
              return res.status(401).json({
                status: 401,
                message:
                  env.MODE === "development"
                    ? `Client ${constants.DEV_EMPTYDOC_MSG}`
                    : constants.PROD_COMMONERROR_MSG,
              });
            }
            user.client = client;
            return res.status(200).json({
              status: 200,
              data: user,
              message: "Notification setting has been updated",
            });
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  return controllers;
};

// stripePayload.tokens.create(
//   {
//     // @ts-ignore
//     card: {
//       number: req.body.number,
//       exp_month: req.body.exp_month,
//       exp_year: req.body.exp_year,
//       cvc: req.body.cvc,
//     },
//   },
//   async function(err, token) {
//     console.log("err: ", err, "token: ", token, " user ", user);
//     if (err) {
//       return res.status(400).json({
//         status: 400,
//         data: user,
//         message: err.message,
//       });
//     }
//     const customer = await this.stripePayload.customers.create(
//       {
//         email: user.email,
//         source: token.id,
//       },
//       (err, customer) => {
//         console.log("customers: ", customer);
//       },
//     );
//   },
// );
