// @ts-nocheck
import Review from "@Models/review.model";
import Contract from "@Models/contract.model";
import User from "@Models/user.model";

import getEnv, { constants } from "@Config/index";

const env = getEnv();

export default () => {
  const controllers = {};

  controllers.get = async (req, res, next) => {
    await Review.findById(req.query._id)
      .populate({
        path: "contract",
        model: "contract",
        populate: {
          path: "job",
          model: "job",
          select: {
            budgetType: 1,
            budget: 1,
            title: 1,
          },
        },
      })
      .populate("from")
      .populate("to")
      .then(async (reviews) => {
        return res.status(200).json({
          status: 200,
          data: reviews,
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

  controllers.getReviews = async (req, res, next) => {
    await Review.find(req.query)
      .populate({
        path: "contract",
        model: "contract",
        populate: {
          path: "job",
          model: "job",
          select: {
            budgetType: 1,
            budget: 1,
            title: 1,
          },
        },
      })
      .populate("from")
      .populate("to")
      .then(async (reviews) => {
        return res.status(200).json({
          status: 200,
          data: reviews,
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

  controllers.getMyReviews = async (req, res, next) => {
    await Review.find({
      to: req.user._id,
    })
      .populate({
        path: "contract",
        model: "contract",
        populate: {
          path: "job",
          model: "job",
          select: {
            budgetType: 1,
            budget: 1,
            title: 1,
          },
        },
      })
      .populate("from")
      .populate("to")
      .then(async (reviews) => {
        return res.status(200).json({
          status: 200,
          data: reviews,
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

  controllers.create = async (req, res, next) => {
    try {
      await Review.findOne({
        contract: req.body.contract,
        from: req.body.from,
      }).then(async (review) => {
        if (review) {
          return res.status(400).json({
            status: 400,
            message: "You left feedback already.",
          });
        }
        await Contract.findOne({
          _id: req.body.contract,
        }).then(async (contract) => {
          if (!contract) {
            return res.status(401).json({
              status: 401,
              message:
                env.NODE_ENV === "development"
                  ? `Contract ${constants.DEV_EMPTYDOC_MSG}`
                  : constants.PROD_COMMONERROR_MSG,
            });
          }
          if (!req.body.to) {
            req.body.to =
              String(contract.client) === String(req.body.from)
                ? contract.vendor
                : contract.client;
          }
          const reviewDoc = new Review({
            ...req.body,
          });
          await reviewDoc.save().then(async (review) => {
            await Contract.findOneAndUpdate(
              {
                _id: contract._id,
              },
              {
                $push: {
                  reviews: review._id,
                },
              },
            );
            return res.status(200).json({
              status: 200,
              data: review,
              message: "Feedback success.",
            });
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message:
          env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
      });
    }
  };

  controllers.update = async (req, res, next) => {
    await Review.findOneAndUpdate(
      {
        _id: req.body._id,
        from: req.user._id,
      },
      req.body,
      {
        new: true,
      },
    )
      .then(async (review) => {
        if (!review) {
          return res.status(401).json({
            status: 401,
            message:
              env.NODE_ENV === "development"
                ? `Review ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: review,
          message: "Review has been updated.",
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
