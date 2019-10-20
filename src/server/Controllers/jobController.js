import Job from "@Models/job.model";
import getEnv, { constants } from "@Config/index";

const env = getEnv();

export default () => {
  const controllers = {};

  controllers.getClientJobs = async (req, res, next) => {
    console.log("user", req.user.accountType);
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
