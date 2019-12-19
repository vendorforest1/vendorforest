// @ts-nocheck
import Milestone from "@Models/milestone.model";
import User from "@Models/user.model";
import Contract from "@Models/contract.model";
import Notifi from "@Models/notification.model";
import getEnv, { constants } from "@Config/index";
import { async } from "q";
import { ObjectId } from "bson";
import { mail } from "@Config/mail";
import saveNotification from "@Config/notification";
import sendSMS from "@Config/sms";
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const env = getEnv();
const stripe = require("stripe")(env.STRIPE_SECRET_KEY);
export default () => {
  const controllers = {};

  controllers.create = async (req, res, next) => {
    console.log("create milestone =====", req.body);
    const newMilestone = new Milestone({
      description: req.body.description,
      price: req.body.price,
      contract: req.body.contract,
    });
    const milestoneID = newMilestone.contract;
    env.MODE === "development" && console.log("$$$$$$ newMilestone $$$$$$", newMilestone);
    const stripeClientId = req.user.stripeClientId;
    const price = newMilestone.price;
    await User.findOne({
      _id: req.user._id,
    })
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
        await user
          .verifyPassword(req.body.password)
          .then(async (isMatch) => {
            if (!isMatch) {
              return res.status(403).json({
                status: 400,
                message: "Your Password is not matched. Please try again.",
              });
            }
            await Contract.findOne({
              _id: milestoneID,
            })
              .populate({
                path: "vendor",
                model: "user",
              })
              .then(async (vendorInfo) => {
                if (!vendorInfo) {
                  return res.status(401).json({
                    status: 401,
                    message:
                      env.NODE_ENV === "development"
                        ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                        : constants.PROD_COMMONERROR_MSG,
                  });
                }
                const vendorEmail = vendorInfo.vendor;
                const vendorPhone = vendorInfo.vendor.phone;
                await paymentIntent(stripeClientId, price)
                  .then(() => {
                    // if (!resul) {
                    //   return res.status(401).json({
                    //     status: 401,
                    //     message:
                    //       env.NODE_ENV === "development"
                    //         ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                    //         : constants.PROD_COMMONERROR_MSG,
                    //   });
                    // }
                    newMilestone
                      .save()
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
                              escrowPrice: milestone.price,
                            },
                            budget: req.body.budget,
                          },
                        )
                          .then(async (result) => {
                            if (!result) {
                              return res.status(401).json({
                                status: 401,
                                message:
                                  env.NODE_ENV === "development"
                                    ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                                    : constants.PROD_COMMONERROR_MSG,
                              });
                            }
                            const vendorId = result.vendor;
                            const emailTitle = "Milestone has been created.";
                            const description = `You can start work on this job. Your accepted budget is ${milestone.price} USD.`;
                            const phoneDescription = `You can start work on this job.\n Your accepted budget is ${milestone.price} USD.`;
                            env.MODE === "development" &&
                              console.log("create milestone result", result);
                            saveNotification(vendorId, description);
                            sendSMS(vendorPhone, emailTitle, phoneDescription);
                            await mail.sendCreateMilestoneEmail(
                              vendorEmail,
                              "VendorForest information!",
                              (err, msg) => {
                                if (err) {
                                  return err;
                                }
                                return;
                              },
                            );
                          })
                          .catch(
                            (error) =>
                              env.MODE === "development" &&
                              console.log("saving notification error", error),
                          );
                        env.MODE === "development" && console.log("milestone", milestone);
                        return res.status(200).json({
                          status: 200,
                          data: milestone,
                          message: "Milestone has been created successfully.",
                        });
                      })
                      .catch((error) => {
                        return res.status(500).json({
                          status: 500,
                          message:
                            env.NODE_ENV === "development"
                              ? error.message
                              : constants.PROD_COMMONERROR_MSG,
                        });
                      });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      status: 500,
                      message: `Errors ${error}`,
                    });
                  });
              })
              .catch((error) => {
                return res.status(500).json({
                  status: 500,
                  message: `Errors ${error}`,
                });
              });
          })
          .catch((error) => {
            return res.status(500).json({
              status: 500,
              message:
                env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  const paymentIntent = async (clientID, price) => {
    const paymentIntent = await stripe.paymentMethods.list({
      customer: clientID,
      type: "card",
    });
    env.MODE === "development" &&
      console.log("paymentMethodId&&&&&&&&&&&&&&&&", paymentIntent.data[0].id);
    const paymentMethodId = paymentIntent.data[0].id;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        customer: clientID,
        payment_method: paymentMethodId,
        confirm: true,
      });
      env.MODE === "development" &&
        console.log("##########paymentIntent@@@@@@@@@@@@", paymentIntent);
    } catch (err) {
      // Error code will be authentication_required if authentication is needed
      env.MODE === "development" && console.log("Error code is: ", err.code);
      payment_intent_id = err.raw.payment_intent.id;
      stripe.paymentIntents.retrieve(payment_intent_id, function(err, paymentIntentRetrieved) {
        env.MODE === "development" && console.log("PI retrieved: ", paymentIntentRetrieved.id);
      });
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
          message:
            env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.release = async (req, res, next) => {
    // const userStripeAccount = req.user.stripeClientId;
    const milestoneID = req.body._id;
    try {
      await Milestone.find({
        _id: milestoneID,
      })
        .populate({
          path: "contract",
          model: "contract",
          populate: {
            path: "vendor",
            model: "user",
          },
        })
        .then((milestone) => {
          if (!milestone) {
            return res.status(401).json({
              status: 401,
              message:
                env.NODE_ENV === "development"
                  ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                  : constants.PROD_COMMONERROR_MSG,
            });
          }
          env.MODE === "development" && console.log("fetch milestone result === ", milestone);
          const vendorStripeID = milestone[0].contract.vendor.connectedAccountId;
          const vendorEmail = milestone[0].contract.vendor;
          const vendorPhone = milestone[0].contract.vendor.phone;
          const vendorID = milestone[0].contract.vendor._id;
          const price = milestone[0].price;
          stripe.transfers
            .create({
              amount: price * 100 * 0.75,
              currency: "usd",
              destination: vendorStripeID,
            })
            .then(async (transfer) => {
              if (!transfer) {
                return res.status(401).json({
                  status: 401,
                  message:
                    env.NODE_ENV === "development"
                      ? `Milestone ${constants.DEV_EMPTYDOC_MSG}`
                      : constants.PROD_COMMONERROR_MSG,
                });
              }
              const transferResult = transfer.amount;
              env.MODE === "development" && console.log("transfer result+++++===", transfer);
              await Milestone.findOneAndUpdate(
                {
                  _id: milestoneID,
                },
                {
                  status: constants.MILESTONE_STATUS.RELEASED,
                },
                {
                  new: true,
                },
              )
                .then(async (milestone) => {
                  env.MODE === "development" &&
                    console.log("milestone result+++++===", milestone);
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
                        escrowPrice: -milestone.price,
                      },
                    },
                  ).then(async (contract) => {
                    env.MODE === "development" &&
                      console.log("contract result+++++===", contract);
                    if (!contract) {
                      return res.status(401).json({
                        status: 401,
                        message:
                          env.NODE_ENV === "development"
                            ? `Contract ${constants.DEV_EMPTYDOC_MSG}`
                            : constants.PROD_COMMONERROR_MSG,
                      });
                    }
                    const emailTitle = "Milestone has been released.";
                    const description = `Milestone has been released. Your client released the milestone. Amount is ${milestone.price *
                      0.75} USD.`;
                    const phoneDescription = `Milestone has been released.\n Your client released the milestone. Amount is ${milestone.price *
                      0.75} USD. \n vendorforest.com`;
                    console.log(
                      "=====",
                      emailTitle,
                      description,
                      phoneDescription,
                      vendorID,
                      vendorPhone,
                      "======",
                    );
                    saveNotification(vendorID, description);
                    sendSMS(vendorPhone, emailTitle, phoneDescription);
                    await mail.sendReleaseMilestoneEmail(
                      vendorEmail,
                      "VendorForest information!",
                      (err, msg) => {
                        if (err) {
                          return err;
                        }
                        return;
                      },
                    );
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
                    message:
                      env.NODE_ENV === "development"
                        ? error.message
                        : constants.PROD_COMMONERROR_MSG,
                  });
                });
            })
            .catch((error) => {
              return res.status(500).json({
                status: 500,
                message: `You and your vendor have to register the payment method. ${error}`,
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            status: 500,
            message: `Errors ${error}`,
          });
        });
    } catch (error) {
      env.MODE === "development" && console.log("err ocurred &&&&&", error);
      return res.status(500).json({
        status: 500,
        message: `Errors ${error}`,
      });
    }
  };

  const sendingEmail = async (emailAddress, title, description) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: env.SUPPORT_EMAIL,
        pass: env.SUPPORT_SECRET,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"VendorForest Support Team" <vendorforest@gmail.com>', // sender address
      to: emailAddress, // list of receivers
      subject: title,
      text: "Vendorforest.com",
      html: `<h1 style={color: blue; font-weight: bold;}>${title}</h1><div>${description}</div>`,
    });

    env.MODE === "development" && console.log("Message sent: %s", info.messageId);
  };

  const sendingSms = async (phone, title, description) => {
    const accountSid = env.TWILIO_ACCOUNT_SID;
    const authToken = env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    try {
      client.messages
        .create({
          to: phone,
          from: env.SERVER_TWILIO_NUMBER,
          body: `${title} ${description}`,
        })
        .then((message) => env.MODE === "development" && console.log(message.sid));
      env.MODE === "development" && console.log("end");
    } catch (error) {
      env.MODE === "development" && console.log(error);
    }
  };

  const saveReleaseNotification = async (vendorId, price) => {
    const time = new Date().toLocaleString();
    const query = new Notifi({
      username: vendorId,
      notificationMsg: `Milestone Released. Amount is ${price} USD`,
      time: time,
    });
    await query.save();
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
          message:
            env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
          message:
            env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
          message:
            env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.getMilestones = async (req, res, next) => {
    console.log("returned query ===== ", req.query);
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
          message:
            env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  return controllers;
};
