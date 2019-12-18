import Portfolio from "@Models/portfolio.model";
import User from "@Models/user.model";
import getEnv, { constants } from "@Config/index";

const env = getEnv();

export default () => {
  const controllers = {};

  controllers.get = async (req, res, next) => {
    await Portfolio.findById(req.query._id)
      .populate("user")
      .then(async (portfolio) => {
        if (!portfolio) {
          return res.status(401).json({
            status: 401,
            message:
              env.MODE === "development"
                ? `Portfolio ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: portfolio,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  // controllers.getPortfolios = async (req, res, next) => {
  //   await Portfolio.find({
  //     user: req.query.user,
  //   })
  //     .populate("user")
  //     .then(async (portfolios) => {
  //       return res.status(200).json({
  //         status: 200,
  //         data: portfolios,
  //       });
  //     })
  //     .catch((error) => {
  //       return res.status(500).json({
  //         status: 500,
  //         message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
  //       });
  //     });
  // };

  controllers.getMyPortfolios = async (req, res, next) => {
    await Portfolio.find({
      user: req.user._id,
    })
      .populate("user")
      .then(async (portfolios) => {
        return res.status(200).json({
          status: 200,
          data: portfolios,
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
      const portfolioDoc = new Portfolio({
        user: req.user._id,
        ...req.body,
      });
      await portfolioDoc.save().then(async (portfolio) => {
        await User.findOneAndUpdate({
          _id: req.user._id
        },{
          $inc :
          {
             profilePercent: 33 
          }
        })
        .then(() => {})
        return res.status(200).json({
          status: 200,
          data: portfolio,
          message: "Portfolio has been created.",
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
    await Portfolio.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body,
      {
        new: true,
      },
    )
      .then(async (portfolio) => {
        if (!portfolio) {
          return res.status(401).json({
            status: 401,
            message:
              env.MODE === "development"
                ? `Portfolio ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: portfolio,
          message: "Portfolio has been updated.",
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
