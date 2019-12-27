import Job from "@Models/job.model";
import Proposal from "@Models/proposal.model";
import Offer from "@Models/offer.model";
import getEnv, { constants } from "@Config/index";
import saveNotification from "@Config/notification";
import sendSMS from "@Config/sms";

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
    Job.find({
      _id: client,
    })
      .populate({
        path: "client",
        model: "user",
      })
      .then((result) => {
        const clientEmail = result[0].client.email;
        const clientphone = result[0].client.phone;
        const clientID = result[0].client._id;
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
  return controllers;
};
