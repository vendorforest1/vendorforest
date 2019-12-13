import Job from "@Models/job.model";
import User from "@Models/user.model";
import Room from "@Models/chatRoom.model";
import Vendor from "@Models/vendor.model";
import getEnv, { constants } from "@Config/index";
import mongoose from "mongoose";
import { mail } from "@Config/mail";
import saveNotification from "@Config/notification";
import sendSMS from "@Config/sms";
import { async } from "q";

//send notification
const webpush = require("web-push");
const nodemailer = require("nodemailer");
// const emailTemplate = fs.readFileSync("/public/emails/email_new_jobs_arround_area.hjs", "utf-8");
// const compileTemplate = Hogan.compile(emailTemplate);
const twilio = require("twilio");
const env = getEnv();

// const io = socketio(server);

export default () => {
  const controllers = {};

  controllers.getClientJobs = async (req, res) => {
    let query = {
      client: req.user._id,
    };
    if (req.body.status) {
      query.$or = req.body.status.map((st) => {
        return {
          status: st,
        };
      });
    }
    await Job.find(query)
      .populate("service")
      .populate("category")
      .populate("client")
      .populate("invitedVendors")
      .populate({
        model: "proposal",
        path: "proposales",
        populate: {
          model: "user",
          path: "vendor",
        },
      })
      .sort({
        createdAt: -1,
      })
      .then(async (jobs) => {
        return res.status(200).json({
          status: 200,
          data: jobs,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.get = async (req, res) => {
    await Job.findById(req.query._id)
      .populate("service")
      .populate("category")
      .populate({
        path: "client",
        model: "user",
        populate: {
          path: "client",
          model: "client",
        },
      })
      .populate({
        path: "invitedVendors",
        model: "user",
        populate: {
          path: "vendor",
          model: "vendor",
          populate: [
            {
              path: "service",
              model: "service",
            },
            {
              path: "category",
              model: "category",
            },
          ],
        },
      })
      .populate({
        model: "proposal",
        path: "proposales",
        populate: {
          model: "user",
          path: "vendor",
        },
      })
      .then(async (job) => {
        if (!job) {
          return res.status(401).json({
            status: 401,
            message:
              env.MODE === "development"
                ? `Job ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: job,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.create = async (req, res) => {
    const invitedVendors = req.body.invitedVendors;
    if (invitedVendors) {
      invitedVendors.map((vendorId) => {
        console.log("Invited vendor list = ", vendorId);
        User.find(
          {
            _id: vendorId,
          },
          {
            email: 1,
            phone: 1,
          },
        )
          .then((result) => {
            const vendorEmail = result[0].email;
            const vendorID = result[0]._id;
            const phoneNumber = result[0].phone;
            const notiDescription = `You are invited to this job. Title: ${req.body.title}`;
            saveNotification(vendorID, notiDescription);
            sendSMS(
              phoneNumber,
              "You are invited to this job",
              `Title: ${req.body.title} \n Please bid on this job. \n vendorforest.com`,
            );
            //send Email
          })
          .catch((err) => {
            env.MODE === "development" && console.log("error occured", err);
          });
      });
    }
    const newJob = new Job({ ...req.body, client: req.user._id });
    const title = req.body.title;
    await newJob
      .save()
      .then(async (job) => {
        if (!job) {
          return res.status(401).json({
            status: 401,
            message:
              env.MODE === "development"
                ? `User ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        console.log("before sending email", job);
        // send notification
        await Vendor.find(
          {
            category: req.body.category,
          },
          {
            _id: 1,
          },
        ).then(async (vendors) => {
          console.log("result[0]: ", vendors);

          await vendors.map(async (vendor) => {
            await User.find(
              {
                vendor: vendor._id,
              },
              // {
              //   firstName: 1,
              //   email: 1,
              //   phone: 1,
              // },
            )
              .then(async (result) => {
                const vendorId = result[0]._id;
                const notificationDescription = `New job posted The title is ${title}`;
                const vendorPhone = result[0].phone;
                const vendorTitle = "New job posted";
                const smsDescription = `Title: ${title} \n This job is matched well to your skill. \n vendorforest.com`;
                // saveNotification(vendorId, notificationDescription);
                // sendSMS(vendorPhone, vendorTitle, smsDescription);
                console.log(result[0], "***********");

                await mail.sendVendorEmail(
                  result[0],
                  "VendorForest information!",
                  (err, msg) => {
                    if (err) {
                      return err;
                    }
                    return;
                  },
                );
              })
              .catch((error) => {
                return res.status(404).json({
                  status: 404,
                  message: "something went wrong!",
                });
              });
          });
        });
        return res.status(200).json({
          status: 200,
          data: job,
          message: "Job has been published",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.initChat = async (req, res) => {
    // const ObjectId = require("mongodb").ObjectID;
    const myName = req.user.username;
    const vendorID = req.body.vendor;
    await User.findOne({ _id: mongoose.Types.ObjectId(vendorID) }, function(err, result) {
      if (err) {
        throw err;
      }
    })
      .then((result) => {
        const senderRoomInfo = new Room({
          user: myName,
          roomName: result.username,
        });
        senderRoomInfo.save();
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: error,
        });
      });
  };

  controllers.sendingNotification = (req, res) => {
    const title = req.body.post.title;
    const subscription = req.body.subscription;
    webpush.setVapidDetails(
      env.COMET_WEB_PUSH_CONTACT,
      env.COMET_PUBLIC_VAPID_KEY,
      env.COMET_PRIVATE_VAPID_KEY,
    );
    env.MODE === "development" && console.log("SUBscription list", subscription);

    const payload = JSON.stringify({
      title: "New job posted in Vendorforest.com",
      body: title,
    });
    webpush
      .sendNotification(subscription, payload)
      .then(
        (result) =>
          env.MODE === "development" && console.log("after sending notification", result),
      )
      .catch((e) => env.MODE === "development" && console.log(e.stack));

    res.status(200).json({ success: true });
  };

  controllers.sendEmail = async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    const country = req.body.location.country;
    const state = req.body.location.state;
    const city = req.body.location.city;
    const lat = req.body.postRadius;
    const title = req.body.title;
    const description = req.body.description;
    // query["location.city"] = req.body.location.city;
    await User.find(
      {
        accountType: 1,
        "bsLocation.country": country,
        "bsLocation.state": state,
        "bsLocation.city": city,
        "bsLocation.lat": { $lt: lat },
      },
      {
        email: 1,
        phone: 1,
        _id: 0,
      },
    )
      .then((data) =>
        data.map(async (result) => {
          await mail.sendVendorEmail(result, "VendorForest information!", (err, msg) => {
            if (err) {
              return res.status(404).json({
                status: 404,
                message: "Email was not sent something went wrong!",
              });
            }
            return res.status(200).json({
              status: 200,
              message: "Email about this has been sent to vendors successfully.",
            });
          });
          sendingSms(result.phone, title, description);
        }),
      )
      .catch((error) => env.MODE === "development" && console.log("error occured", error));
  };

  controllers.update = async (req, res) => {
    await Job.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body,
      {
        new: true,
      },
    )
      .then(async (job) => {
        return res.status(200).json({
          status: 200,
          data: job,
          message: "Job has been updated successfully.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.find = async (req, res) => {
    const statusQuery = req.body.status.map((st) => {
      return {
        status: st,
      };
    });
    if (req.user.vendor) {
      await Vendor.find(
        {
          _id: req.user.vendor,
        },
        {
          category: 1,
          service: 1,
          company: 1,
          _id: 0,
        },
      )
        .then(async (result) => {
          const query = {};
          if (result[0].service) {
            query.service = result[0].service;
          }
          if (result[0].category) {
            query.category = result[0].category;
          }
          if (req.body.client) {
            query.client = req.body.client;
          }
          if (req.body.budgetType !== undefined) {
            query.budgetType = req.body.budgetType;
          }
          if (req.body.vendorType !== undefined) {
            query.vendorType = req.body.vendorType;
          }
          if (req.body.location && req.body.location.country) {
            query["location.country"] = req.body.location.country;
          }
          if (req.body.location && req.body.location.city) {
            query["location.city"] = req.body.location.city;
          }
          if (req.body.title) {
            const re = new RegExp(req.body.title, "i");
            query["title"] = re;
          }
          if (
            result[0].service &&
            result[0].category &&
            result[0].company &&
            req.user.bsLocation &&
            req.user.connectedAccountId
          ) {
            await Job.find({
              ...query,
              status: 0,
            })
              .populate("service")
              .populate("category")
              .populate({
                path: "proposales",
                model: "proposal",
                select: {
                  vendor: 1,
                },
              })
              .populate({
                path: "client",
                model: "user",
                populate: {
                  path: "client",
                  model: "client",
                },
              })
              .populate({
                path: "hiredVendors",
                model: "user",
                populate: {
                  path: "vendor",
                  model: "vendor",
                },
              })
              .sort({
                createdAt: -1,
              })
              .then(async (jobs) => {
                return res.status(200).json({
                  status: 200,
                  data: jobs,
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  status: 500,
                  message:
                    env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
                });
              });
          }
        })
        .catch((err) => {
          env.MODE === "development" ? err.message : constants.PROD_COMMONERROR_MSG;
        });
    }
  };

  return controllers;
};
