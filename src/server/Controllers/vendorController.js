import User from "../models/user.model";
import Vendor from "../models/vendor.model";
// import Team from "../models/team.model";
import Company from "../models/company.model";
import { calculateDistance } from "@Utils/utils";
import getEnv, { constants } from "@Config/index";

const config = getEnv();

export default () => {
  const controllers = {};

  controllers.get = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate({
        path: "vendor",
        model: "vendor",
        populate: {
          path: "company",
          model: "company",
        },
      })
      .then(async (user) => {
        if (!user) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
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
          message:
            config.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.find = async (req, res, next) => {
    await User.find({
      email: req.query.email,
      accountType: constants.ACCOUNT_TYPE.VENDOR,
    })
      .populate("client")
      .populate("vendor")
      .then(async (users) => {
        return res.status(200).json({
          status: 200,
          data: users,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message:
            config.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.update = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("vendor")
      .then(async (user) => {
        if (!user) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `User ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        await Vendor.findOneAndUpdate(
          {
            _id: user.vendor._id,
          },
          req.body,
          {
            new: true,
          },
        )
          .populate("company")
          .then(async (vendor) => {
            if (!vendor) {
              return res.status(401).json({
                status: 401,
                message:
                  config.env.NODE_ENV === "development"
                    ? `Vendor ${constants.DEV_EMPTYDOC_MSG}`
                    : constants.PROD_COMMONERROR_MSG,
              });
            }
            user.vendor = vendor;
            return res.status(200).json({
              status: 200,
              data: user,
              message: "Profile has been updated",
            });
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message:
            config.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.updateNotifySettings = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("vendor")
      .then(async (user) => {
        if (!user) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `User ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        await Vendor.findOneAndUpdate(
          {
            _id: user.vendor._id,
          },
          {
            notification: {
              ...user.vendor.notification,
              ...req.body,
            },
          },
          {
            new: true,
          },
        )
          .populate("company")
          .then(async (vendor) => {
            if (!vendor) {
              return res.status(401).json({
                status: 401,
                message:
                  config.env.NODE_ENV === "development"
                    ? `Vendor ${constants.DEV_EMPTYDOC_MSG}`
                    : constants.PROD_COMMONERROR_MSG,
              });
            }
            user.vendor = vendor;
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
          message:
            config.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.updateCompany = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("vendor")
      .then(async (user) => {
        if (!user) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `User ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        if (user.vendor.company) {
          await Company.findOneAndUpdate(
            {
              _id: user.vendor.company,
            },
            req.body,
            {
              new: true,
            },
          )
            .then(async (company) => {
              if (!company) {
                return res.status(401).json({
                  status: 401,
                  message:
                    config.env.NODE_ENV === "development"
                      ? `Company ${constants.DEV_EMPTYDOC_MSG}`
                      : constants.PROD_COMMONERROR_MSG,
                });
              }
              user.vendor.company = company;
              return res.status(200).json({
                status: 200,
                data: user,
                message: "Company has been updated",
              });
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        } else {
          const newCompany = new Company(req.body);
          await newCompany
            .save()
            .then(async (company) => {
              await Vendor.findOneAndUpdate(
                {
                  _id: user.vendor._id,
                },
                {
                  company: company._id,
                },
                {
                  new: true,
                },
              )
                .populate("company")
                .then(async (vendor) => {
                  user.vendor = vendor;
                  return res.status(200).json({
                    status: 200,
                    data: user,
                    message: "Company has been updated",
                  });
                })
                .catch((error) => {
                  throw new Error(error.message);
                });
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message:
            config.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.searchVendorInRadius = async (req, res, next) => {
    await User.find({
      accountType: constants.ACCOUNT_TYPE.VENDOR,
    })
      .populate({
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
      })
      .then(async (users) => {
        const matchUsers = users.filter((user) => {
          if (user.bsLocation) {
            if (
              calculateDistance(
                user.bsLocation.lat,
                user.bsLocation.lng,
                req.body.lat,
                req.body.lng,
              ) <= req.body.radius
            ) {
              return true;
            }
          }
          return false;
        });
        return res.status(200).json({
          status: 200,
          data: matchUsers,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message:
            config.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  return controllers;
};
