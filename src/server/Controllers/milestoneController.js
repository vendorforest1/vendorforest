// @ts-nocheck
import Milestone from "@Models/milestone.model";
import Contract from "@Models/contract.model";
import getEnv, { constants } from "@Config/index";
const env = getEnv();
const stripe = require("stripe")(env.STRIPE_SECRET_KEY);
export default () => {
  const controllers = {};

  controllers.create = async (req, res, next) => {
    const newMilestone = new Milestone({ ...req.body });
    const user = req.user.stripe_client_id;
    const price = newMilestone.price;
    const paymentIntentID = paymentIntent(user, price);
    console.log("paymentMethodId&&&&&&&&&&&&&&&&", paymentIntentID);
    await newMilestone
      .save()
      .then(async (milestone) => {
        return res.status(200).json({
          status: 200,
          data: milestone,
          message: "Milestone has been created successfully.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  const paymentIntent = async (clientID, price) => {
    const paymentIntent = await stripe.paymentMethods.list({
      customer: clientID,
      type: "card",
    });
    console.log("paymentMethodId&&&&&&&&&&&&&&&&", paymentIntent.data[0].id);
    const paymentMethodId = paymentIntent.data[0].id;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: 'usd',
        customer: clientID,
        payment_method: paymentMethodId,
        confirm: true,
      });
    } catch (err) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is: ', err.code);
      payment_intent_id = err.raw.payment_intent.id;
      stripe.paymentIntents.retrieve(
        payment_intent_id,
        function(err, paymentIntentRetrieved) {
          console.log('PI retrieved: ', paymentIntentRetrieved.id);
        }
        );
    }
  };

  controllers.update = async (req, res, next) => {
    await Milestone.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body,
      {
        new: true,
      },
    )
      .then(async (milestone) => {
        if (!milestone) {
          return res.status(401).json({
            status: 401,
            message:
              env.NODE_ENV === "development"
                ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: milestone,
          message: "Milestone has been updated successfully.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.release = async (req, res, next) => {
    await Milestone.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        status: constants.MILESTONE_STATUS.RELEASED,
      },
      {
        new: true,
      },
    )
      .then(async (milestone) => {
        if (!milestone) {
          return res.status(401).json({
            status: 401,
            message:
              env.NODE_ENV === "development"
                ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        await Contract.findOneAndUpdate(
          {
            _id: milestone.contract,
          },
          {
            $inc: {
              paidPrice: milestone.price,
            },
          },
        ).then(async (contract) => {
          if (!contract) {
            return res.status(401).json({
              status: 401,
              message:
                env.NODE_ENV === "development"
                  ? `Contract ${constants.DEV_EMPTYDOC_MSG}`
                  : constants.PROD_COMMONERROR_MSG,
            });
          }
          return res.status(200).json({
            status: 200,
            data: milestone,
            message: "Milestone has been released successfully.",
          });
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.reqRelease = async (req, res, next) => {
    await Milestone.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        status: constants.MILESTONE_STATUS.REQ_RELEASED,
      },
      {
        new: true,
      },
    )
      .then(async (milestone) => {
        if (!milestone) {
          return res.status(401).json({
            status: 401,
            message:
              env.NODE_ENV === "development"
                ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: milestone,
          message: "Request has been sent successfully.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.cancel = async (req, res, next) => {
    await Milestone.findOneAndRemove({
      _id: req.body._id,
    })
      .then(async (milestone) => {
        if (!milestone) {
          return res.status(401).json({
            status: 401,
            message:
              env.NODE_ENV === "development"
                ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: milestone,
          message: "Milestone has been removed successfully.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.get = async (req, res, next) => {
    await Milestone.findById(req.query._id)
      .populate({
        path: "constract",
        model: "constract",
      })
      .then(async (milestone) => {
        if (!milestone) {
          return res.status(401).json({
            status: 401,
            message:
              env.NODE_ENV === "development"
                ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: milestone,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.getMilestones = async (req, res, next) => {
    await Milestone.find(req.query)
      .then(async (milestones) => {
        return res.status(200).json({
          status: 200,
          data: milestones,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  return controllers;
};
