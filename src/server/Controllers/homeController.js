import Service from "@Models/service.model";
import User from "@Models/user.model";
import Job from "@Models/job.model";
import getEnv, { constants } from "@Config/index";

const env = getEnv();

export default () => {
  const controllers = {};

  controllers.get = async (req, res, next) => {
    try {
      const services = await Service.find({}).populate({
        path: "categories",
        model: "category",
      });
      const vendors = await User.find({
        accountType: constants.ACCOUNT_TYPE.VENDOR,
        vendor: {
          $exists: true,
        },
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
        .lean()
        .sort({
          "vendor.rate": 1,
        })
        .limit(9);
      const jobs = await Job.find({
        status: constants.JOB_STATUS.POSTED,
      })
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
        .lean()
        .sort({
          createdAt: -1,
        })
        .limit(3);
      return res.status(200).json({
        status: 200,
        data: {
          services: services,
          vendors: vendors,
          jobs: jobs,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message:
          process.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
      });
    }
  };

  return controllers;
};
