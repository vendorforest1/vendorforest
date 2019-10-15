import Review from "@Models/review.model";
// import User from "@Models/user.model";
import getEnv, { constants } from "@Config/index";

const env = getEnv();

export default () => {
  const controllers = {};

  controllers.get = async (req, res, next) => {
    await Review.findById(req.query._id)
      .populate("job")
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.getReviews = async (req, res, next) => {
    await Review.find({
      to: req.query.to,
      from: req.query.from,
    })
      .populate("job")
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.getMyReviews = async (req, res, next) => {
    await Review.find({
      to: req.user._id,
    })
      .populate("job")
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.create = async (req, res, next) => {
    try {
      const reviewDoc = new Review({ ...req.body });
      await reviewDoc.save().then(async (review) => {
        return res.status(200).json({
          status: 200,
          data: review,
          message: "Feedback success.",
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
              env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  return controllers;
};
