import User from "@Models/user.model";
import Client from "@Models/client.model";
import Notification from "@Models/notification.model";
// import Token from "../models/token.model";
import getEnv, { constants } from "@Config/index";
import { ObjectId } from "bson";
import mongoose from "mongoose";

const env = getEnv();
const stripe = require("stripe")(env.STRIPE_SECRET_KEY);

export default () => {
  const controllers = {};
  //client deposits money into an escrow account
  controllers.depositMoney = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("client")
      .then(async (user) => {})
      .catch((error) => {});
  };

  controllers.getPubKey = async (req, res) => {
    const stripePubKey = env.CLIENT_ID;
    return res.json({ pubKey: stripePubKey });
  };

  controllers.getSetupIntent = async (req, res) => {
    const intent = await stripe.setupIntents.create();
    return res.json({ client_secret: intent.client_secret });
  };

  controllers.getClientId = async (req, res) => {
    await stripe.customers
      .create({
        source: req.body.token_id,
        email: req.user.email,
      })
      .then((result) => {
        const stripeInfo = {
          stripeClientId: result.id,
          cardId: result.default_source,
        };
        try {
          User.findOneAndUpdate(
            {
              email: req.user.email,
            },
            stripeInfo,
            {
              new: true,
            },
          ).then((result) => {
            return res.status(200).json({
              status: 200,
              message: "Your card has been accepted.",
            });
          }); //("Your Stripe Client Id is saved.")
        } catch (error) {
          env.MODE === "development" && console.log("saving client id error", error);
          return res.status(404).json({ status: 404, message: error.message });
        }
      })
      .catch((e) => {
        return res.status(404).json({ status: 404, message: e.message });
      });
  };

  controllers.updateClientId = async (req, res) => {
    await stripe.customers
      .update(req.user.stripeClientId, {
        source: req.body.token_id,
        email: req.user.email,
      })
      .then((result) => {
        const stripeInfo = {
          stripeClientId: result.id,
          cardId: result.default_source,
        };
        try {
          User.findOneAndUpdate(
            {
              email: req.user.email,
            },
            stripeInfo,
            {
              new: true,
            },
          ).then((result) => {
            return res.status(200).json({
              status: 200,
              message: "Your card has been updated successfully.",
            });
          });
        } catch (error) {
          env.MODE === "development" && console.log("saving client id error", error);
          return res.status(404).json({ status: 404, message: error.message });
        }
      })
      .catch((e) => {
        return res.status(404).json({ status: 404, message: e.message });
      });
  };
  controllers.getCardDigits = async (req, res) => {
    const clientId = req.user.stripeClientId;
    const cardId = req.user.cardId;
    await stripe.customers.retrieveSource(clientId, cardId, function(err, card) {
      if (err) {
        return res.status(404).json({ status: 404, message: err });
      }
      return res.status(200).json({
        status: 200,
        digits: card.last4,
      });
    });
  };

  controllers.getClient = async (req, res, _next) => {
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
  controllers.updateBillingInformation = async (req, res, _next) => {
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
        env.MODE === "development" && console.log("updateBillingInformation ", req.body);
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
            env.MODE === "development" &&
              console.log("err: ", err, "token: ", token, " user ", user);
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
              (_err, customer) => {
                env.MODE === "development" && console.log("customers: ", customer);
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
        //     env.MODE === "development" && console.log("resolve client!!! ", client);
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
      .catch((_error) => {});
  };

  controllers.updateNotifySettings = async (req, res, _next) => {
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

  controllers.getNotifications = async (req, res) => {
    const user = req.user._id;

    // await Notification.find({ username: ObjectId(user) })
    await Notification.find({ username: user })
      .sort({ createdAt: -1 })
      .limit(10)
      .then((result) => {
        return res.status(200).json({
          data: result,
        });
      })
      .catch((err) => env.MODE === "development" && console.log("err = ", err));
  };

  return controllers;
};
