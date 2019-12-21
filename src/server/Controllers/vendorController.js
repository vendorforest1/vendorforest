import User from "@Models/user.model";
import Vendor from "@Models/vendor.model";
import Portfolio from "@Models/portfolio.model";
import Team from "../models/team.model";

// import Team from "../models/team.model";
import Company from "@Models/company.model";
import { calculateDistance } from "@Utils/utils";
import getEnv, { constants } from "@Config/index";

const env = getEnv();

export default () => {
  const controllers = {};

  controllers.get = async (req, res, next) => {
    env.MODE === "development" && console.log("get should call this");

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
              env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };
  //**********************.. */
  controllers.getVendor = async (req, res, next) => {
    await Vendor.findById(req.user.vendor._id)
      .populate("vendor")
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
        await Vendor.findOneAndUpdate(
          {
            _id: user.vendor._id,
          },
          req.body,
          {
            new: true,
          },
        )
          .populate({ path: "company" })
          .populate({ path: "service" })
          .populate({ path: "category" })
          .then(async (vendor) => {
            if (!vendor) {
              return res.status(401).json({
                status: 401,
                message:
                  env.MODE === "development"
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
        // return res.status(200).json({
        //   status: 200,
        //   data: user,
        // });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  /******************* */
  //CAUTION THIS IS A PUBLIC ROUTE
  controllers.findVendorByUserName = async (req, res, next) => {
    env.MODE === "development" && console.log("findVendorByUserName");
    await User.find({
      username: req.params.username,
      accountType: constants.ACCOUNT_TYPE.VENDOR,
    })
      .populate("vendor")
      .then(async (users) => {
        if (users.length === 0) {
          throw Error("Username not found");
        }
        const user = users[0],
          results = [];
        results.push(user);
        Portfolio.find({
          user: user._id,
        })
          .then(async (portfolios) => {
            return { portfolios: portfolios };
          })
          .then((data) => {
            const result = Object.assign({}, { user: user }, data);
            Team.find({
              $or: [
                {
                  admin: user._id,
                },
                {
                  members: user._id,
                },
                {
                  invitedUsers: user._id,
                },
              ],
            })
              .populate({
                path: "admin",
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
                path: "members",
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
                path: "invitedUsers",
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
              .then(async (team) => {
                let _result = Object.assign({}, { ...result }, { teams: team });
                return res.status(200).json({
                  status: 200,
                  data: _result,
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
  controllers.find = async (req, res, next) => {
    await User.find({
      email: req.query.email,
      accountType: constants.ACCOUNT_TYPE.VENDOR,
    })
      .populate("client")
      .populate("vendor")
      .then(async (results) => {
        if (results.length === 0) {
          throw new Error("not found");
        }
        return res.status(200).json({
          status: 200,
          data: results[0],
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
    await User.findById(req.user._id)
      .populate("vendor")
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
        if (!user.vendor.service) {
          User.findOneAndUpdate(
            {
              _id: req.user._id,
            },
            {
              $inc: {
                profilePercent: 34,
              },
            },
          ).then(() => {});
        }
        env.MODE === "development" && console.log(user);
        await Vendor.updateOne(
          {
            _id: req.user.vendor,
          },
          req.body,
          {
            new: true,
          },
        )
          .populate("company")
          .populate("service")
          .populate("category")
          .then(async (vendor) => {
            if (!vendor) {
              return res.status(401).json({
                status: 401,
                message:
                  env.MODE === "development"
                    ? `Vendor ${constants.DEV_EMPTYDOC_MSG}`
                    : constants.PROD_COMMONERROR_MSG,
              });
            }
            //user.vendor = vendor;
            env.MODE === "development" &&
              console.log("vendor profile upate: ", user, " OR: ", vendor);
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
              env.MODE === "development"
                ? `User ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        await Vendor.findOneAndUpdate(
          {
            _id: user.vendor,
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
                  env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
              env.MODE === "development"
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
                    env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.findVendors = async (req, res, next) => {
    const query = {};
    const service = req.body.service;
    const category = req.body.category;
    // if (req.body.vendorType !== undefined) {
    //   query.vendorType = req.body.vendorType;
    // }
    // if (req.body.location && req.body.location.country) {
    //   query["location.country"] = req.body.location.country;
    // }
    if (req.body.city) {
      query["bsLocation.city"] = req.body.city;
    }
    if (req.body.title) {
      const re = new RegExp(req.body.title, "i");
      query.username = re;
    }
    await User.find({
      ...query,
      accountType: 1,
      vendor: {
        $exists: true,
      },
    })
      .populate({
        path: "vendor",
        model: "vendor",
      })
      .sort({
        createdAt: -1,
      })
      .then(async (vendors) => {
        var vendorData = [];
        if (!service && !category) {
          vendors.map((item) => {
            vendorData.push(item);
          });
        }
        if (service && !category) {
          vendors.map((item) => {
            if (String(item.vendor.service) === service) {
              vendorData.push(item);
            }
          });
        }
        if (service && category) {
          vendors.map((item) => {
            if (
              String(item.vendor.service) === service &&
              String(item.vendor.category) === category
            ) {
              vendorData.push(item);
            }
          });
        }
        return res.status(200).json({
          status: 200,
          data: vendorData,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message:
            process.env.NODE_ENV === "development"
              ? error.message
              : constants.PROD_COMMONERROR_MSG,
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  return controllers;
};
