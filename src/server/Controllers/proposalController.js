import Job from "@Models/job.model";
import Proposal from "@Models/proposal.model";
import Offer from "@Models/offer.model";
import User from "@Models/user.model";
import getEnv, { constants } from "@Config/index";
import saveNotification from "@Config/notification";
import sendSMS from "@Config/sms";
import { mail } from "@Config/mail";
import Notification from "@Models/notification.model";

const env = getEnv();

export default () => {
  const controllers = {};

  controllers.create = async (req, res, next) => {
    const offersData = req.body.offers;
    delete req.body.offers;
    const newProposal = new Proposal({
      ...req.body,
    });
    const checkPs = await Proposal.findOne({
      job: req.body.job,
      vendor: req.body.vendor,
    });
    if (checkPs) {
      return res.status(400).json({
        status: 400,
        message: "You has been bided to this job already.",
      });
    }
    const client = req.body.job;
    Job.findOne({
      _id: client,
    })
      .populate({
        path: "client",
        model: "user",
      })
      .then((result) => {
        const clientEmail = result.client.email;
        const clientphone = result.client.phone;
        const clientID = result.client._id;
        saveNotification(
          clientID,
          `${req.user.username} has bidded on your job post.
                                   Please check that bid.`,
          `/client/job/${req.body.job}`,
        );
        sendSMS(
          clientphone,
          `${req.user.username} has bidded on your job post.`,
          `Please check that bid. \n vendorforest.com`,
        );
        //sending Email
      })
      .catch((error) => env.MODE === "development" && console.log(error));
    await newProposal
      .save()
      .then(async (proposal) => {
        let offers = [];
        if (req.body.bidType === constants.BID_TYPE.TEAM) {
          const offerPromise = offersData.map((offer) => {
            const newOffer = new Offer({
              proposal: proposal._id,
              status: constants.OFFER_STATUS.CREATED,
              ...offer,
            });
            return newOffer.save();
          });
          const offerData = await Promise.all(offerPromise);
          offers = offerData.map((offer) => offer._id);
          offerData.map(async (offer) => {
            await User.findOne({
              _id: offer.receiver,
            }).then(async (invitedVendor) => {
              const vendorId = invitedVendor._id;
              const notificationDescription = `You have been invited to team working. Budget: $${offer.budget} of $${req.body.offerBudget}`;
              const vendorPhone = invitedVendor.phone;
              const vendorTitle = "Vendorforest Info!";
              const smsDescription = `You have been invited to team working. \n Budget: $${offer.budget} of $${req.body.offerBudget} \n vendorforest.com`;
              saveNotification(
                vendorId,
                notificationDescription,
                `/notification`,
                proposal._id,
              );
              sendSMS(vendorPhone, vendorTitle, smsDescription);
              const emailContent = {
                username: invitedVendor.username,
                email: invitedVendor.email,
                budget: offer.budget,
              };
              await mail.sendTeamWorkingInviteEmail(
                emailContent,
                "VendorForest information!",
                (err, msg) => {
                  if (err) {
                    return err;
                  }
                  return;
                },
              );
            });
          });
        }
        await Proposal.findOneAndUpdate(
          {
            _id: proposal._id,
          },
          {
            ...req.body,
            offers: offers,
          },
          {
            new: true,
          },
        ).then(async (ps) => {
          await Job.findOneAndUpdate(
            {
              _id: req.body.job,
            },
            {
              $push: {
                proposales: ps._id,
              },
            },
          ).then((job) => {
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
              message: "Your proposal has been submitted successfully",
            });
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

  controllers.update = async (req, res, next) => {
    await Proposal.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body,
      {
        new: true,
      },
    )
      .then(async (proposal) => {
        return res.status(200).json({
          status: 200,
          message: "Your proposal has been updated successfully.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.delete = async (req, res, next) => {
    await Proposal.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        status: constants.PROPOSAL_STATUS.DECLINE,
      },
      {
        new: true,
      },
    )
      .then(async (proposal) => {
        return res.status(200).json({
          status: 200,
          message: "Proposal has been declined.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.get = async (req, res, next) => {
    await Proposal.findOne({
      _id: req.query._id,
    })
      .populate("job")
      .populate({
        path: "vendor",
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
        path: "offers",
        model: "offer",
      })
      .then(async (ps) => {
        return res.status(200).json({
          status: 200,
          data: ps,
        });
      })
      .catch((error) => {
        env.MODE === "development" && console.log(error);
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.getProposales = async (req, res, next) => {
    await Proposal.find(req.query)
      .populate("job")
      .populate({
        path: "vendor",
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
        path: "offers",
        model: "offer",
      })
      .then(async (ps) => {
        return res.status(200).json({
          status: 200,
          data: ps,
        });
      })
      .catch((error) => {
        env.MODE === "development" && console.log(error);
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.acceptTeamOffer = async (req, res) => {
    Proposal.findOneAndUpdate(
      {
        _id: req.body.proposalId,
      },
      {
        $inc: { bidType: 1 },
      },
    )
      .populate({
        path: "vendor",
        model: "user",
      })
      .then(async (proposal) => {
        const vendorId = proposal.vendor._id;
        const notificationDescription = `${req.user.username} has been accepted to team working.`;
        const vendorPhone = proposal.vendor.phone;
        const vendorTitle = "Vendorforest Info!";
        const smsDescription = `${req.user.username} has been accepted to team working. \n vendorforest.com`;
        await saveNotification(vendorId, notificationDescription, `/notification`);
        await sendSMS(vendorPhone, vendorTitle, smsDescription);
        await Notification.findOneAndUpdate(
          {
            username: req.user._id,
            proposalId: req.body.proposalId,
          },
          {
            status: constants.NOTIFICATION_STATUS.DELETED,
          },
        );
        if (proposal.bidType === proposal.offers.length) {
          Proposal.findOneAndUpdate(
            {
              _id: req.body.proposalId,
            },
            {
              bidType: -1,
            },
          )
            .populate({
              path: "vendor",
              model: "user",
            })
            .then(async (proposalResult) => {
              const vendorId = proposalResult.vendor._id;
              const notificationDescription = `All of your team members accepted the bid. Your team can start work from now.`;
              const vendorPhone = proposalResult.vendor.phone;
              const vendorTitle = "Vendorforest Info!";
              const smsDescription = `All of your team members accepted your offer. Your proposal submitted. \n vendorforest.com`;
              await saveNotification(vendorId, notificationDescription, `/notification`);
              await sendSMS(vendorPhone, vendorTitle, smsDescription);
            })
            .catch((error) => {
              env.MODE === "development" && console.log(error);
              return res.status(500).json({
                status: 500,
                message:
                  env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
              });
            });
        }
        return res.status(200).json({
          status: 200,
          message: "Successfully Accepted",
        });
      })
      .catch((error) => {
        env.MODE === "development" && console.log(error);
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };
  return controllers;
};
