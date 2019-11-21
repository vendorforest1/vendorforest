import Job from "@Models/job.model";
import User from "@Models/user.model";
import socketio from "socket.io";
import http from "http";
import express from "express";
import getEnv, { constants } from "@Config/index";
import { async } from "q";

//send notification
const webpush = require("web-push");
//Sending Email
const fs = require("fs");
const Hogan = require("hogan.js");
const nodemailer = require("nodemailer");
// const emailTemplate = fs.readFileSync("/public/emails/email_new_jobs_arround_area.hjs", "utf-8");
// const compileTemplate = Hogan.compile(emailTemplate);
const env = getEnv();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

export default () => {
  const controllers = {};

  controllers.getClientJobs = async (req, res, next) => {
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
          message:
            process.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.get = async (req, res, next) => {
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
              process.env.NODE_ENV === "development"
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
          message:
            process.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.create = async (req, res, next) => {
    const newJob = new Job({ ...req.body, client: req.user._id });
    await newJob
      .save()
      .then(async (job) => {
        return res.status(200).json({
          status: 200,
          data: job,
          message: "Job has been published",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message:
            process.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.sendingNotification = (req, res) => {
    const title = req.body.post.title;
    const subscription = req.body.subscription;
    webpush.setVapidDetails(env.WEB_PUSH_CONTACT, env.PUBLIC_VAPID_KEY, env.PRIVATE_VAPID_KEY);
    console.log("SUBscription list", subscription);

    const payload = JSON.stringify({
      title: "New job posted in Vendorforest.com",
      body: title,
    });
    webpush
      .sendNotification(subscription, payload)
      .then((result) => console.log("after sending notification", result))
      .catch((e) => console.log(e.stack));

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
        data.map((result) => {
          // sendingEmail(result.email, title, description);
          // sendingSms(result.phone, title, description);
          // notification(result.email, title, description);
        }),
      )
      .catch((error) => console.log("error occured", error));
  };

  const sendingEmail = async (emailAddress, title, description) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: env.EMAIL_ADDRESS,
        pass: env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"VendorForest Support Team" <vendorforest@gmail.com>', // sender address
      to: emailAddress, // list of receivers
      subject: "Hello ✔",
      text: "Hello world?",
      html: `<h1>${title}</h1><div>${description}</div>`,
      // html: compileTemplate.render({ title: title, description: description }),
    });

    console.log("Message sent: %s", info.messageId);
  };

  const sendingSms = async (phone, title, description) => {
    const accountSid = env.ACCOUNT_SID;
    const authToken = env.AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    try {
      client.messages
        .create({
          to: phone,
          from: env.SERVER_TWILIO_NUMBER,
          body: `New Job posted in your location.
                  Please Bid on this project. 
                  Title:${title}
                  Description:${description}`,
        })
        .then((message) => console.log(message.sid));
      console.log("end");
    } catch (error) {
      console.log(error);
    }
  };

  // const notification = async (emailAddress, title, description) => {
  //   console.log("I'm in notification header.");
  //   await io.on("connection", (socket) => {
  //     console.log("New Websocket connection!", socket.id);
  //     // socket.join("room");
  //     const messageDetail = `New job posted near your location. title=${title} description=${description}`;
  //     socket.broadcast.emit("notify", messageDetail);
  //   });
  // };

  controllers.update = async (req, res, next) => {
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
          message:
            process.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.find = async (req, res, next) => {
    const statusQuery = req.body.status.map((st) => {
      return {
        status: st,
      };
    });
    const query = {};
    if (req.body.service) {
      query.service = req.body.service;
    }
    if (req.body.category) {
      query.category = req.body.category;
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
    await Job.find({
      ...query,
      $or: statusQuery,
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
            process.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  return controllers;
};
