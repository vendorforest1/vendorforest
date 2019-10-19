import Job from "@Models/job.model";
import Proposal from "@Models/proposal.model";
import Contract from "@Models/contract.model";
import getEnv, { constants } from "@Config/index";

const env = getEnv();

export default () => {
  const controllers = {};

  controllers.create = async (req, res, next) => {
    const newContract = new Contract({ ...req.body, client: req.user._id });
    await newContract
      .save()
      .then(async (contract) => {
        await Proposal.findOneAndUpdate(
          {
            _id: req.body.proposal,
          },
          {
            status: constants.PROPOSAL_STATUS.HIRED,
          },
        ).then(async (proposal) => {
          if (!proposal) {
            return res.status(401).json({
              status: 401,
              message:
                process.env.NODE_ENV === "development"
                  ? `Proposal ${constants.DEV_EMPTYDOC_MSG}`
                  : constants.PROD_COMMONERROR_MSG,
            });
          }
          await Job.findOneAndUpdate(
            {
              _id: req.body.job,
            },
            {
              status: constants.JOB_STATUS.HIRED,
              $push: {
                hiredVendors: req.body.vendor,
              },
            },
          ).then(async (job) => {
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
              data: contract,
              message: "Contract has been created successfully.",
            });
          });
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
    await Contract.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body,
      {
        new: true,
      },
    )
      .populate({
        path: "job",
        model: "job",
        select: {
          title: 1,
          budgetType: 1,
        },
      })
      .populate({
        path: "client",
        model: "user",
        populate: {
          path: "client",
          model: "client",
          select: {
            username: 1,
            bsLocation: 1,
            profileImage: 1,
            timeZone: 1,
          },
        },
      })
      .populate({
        path: "vendor",
        model: "user",
        populate: {
          path: "vendor",
          model: "vendor",
          select: {
            username: 1,
            bsLocation: 1,
            profileImage: 1,
            timeZone: 1,
          },
        },
      })
      .populate({
        path: "reviews",
        model: "review",
        populate: [
          {
            path: "from",
            model: "user",
            select: {
              username: 1,
            },
          },
          {
            path: "to",
            model: "user",
            select: {
              username: 1,
            },
          },
        ],
      })
      .then(async (contract) => {
        if (!contract) {
          return res.status(401).json({
            status: 401,
            message:
              process.env.NODE_ENV === "development"
                ? `Contract ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: contract,
          message: "Contract has been updated successfully.",
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

  controllers.end = async (req, res, next) => {
    await Contract.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        status: constants.CONTRACT_STATUS.END,
      },
      {
        new: true,
      },
    )
      .populate({
        path: "job",
        model: "job",
      })
      .populate({
        path: "client",
        model: "user",
        populate: {
          path: "client",
          model: "client",
          select: {
            username: 1,
            bsLocation: 1,
            profileImage: 1,
            timeZone: 1,
          },
        },
      })
      .populate({
        path: "vendor",
        model: "user",
        populate: {
          path: "vendor",
          model: "vendor",
          select: {
            username: 1,
            bsLocation: 1,
            profileImage: 1,
            timeZone: 1,
          },
        },
      })
      .populate({
        path: "reviews",
        model: "review",
        populate: [
          {
            path: "from",
            model: "user",
            select: {
              username: 1,
            },
          },
          {
            path: "to",
            model: "user",
            select: {
              username: 1,
            },
          },
        ],
      })
      .then(async (contract) => {
        if (!contract) {
          return res.status(401).json({
            status: 401,
            message:
              process.env.NODE_ENV === "development"
                ? `Contract ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: contract,
          message: "Contract has been ended successfully.",
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
    await Contract.findById(req.query._id)
      .populate({
        path: "job",
        model: "job",
        select: {
          title: 1,
          budgetType: 1,
        },
      })
      .populate({
        path: "client",
        model: "user",
        populate: {
          path: "client",
          model: "client",
          select: {
            username: 1,
            bsLocation: 1,
            profileImage: 1,
            timeZone: 1,
          },
        },
      })
      .populate({
        path: "vendor",
        model: "user",
        populate: {
          path: "vendor",
          model: "vendor",
          select: {
            username: 1,
            bsLocation: 1,
            profileImage: 1,
            timeZone: 1,
          },
        },
      })
      .populate({
        path: "reviews",
        model: "review",
        populate: [
          {
            path: "from",
            model: "user",
            select: {
              username: 1,
            },
          },
          {
            path: "to",
            model: "user",
            select: {
              username: 1,
            },
          },
        ],
      })
      .then(async (contract) => {
        if (!contract) {
          return res.status(401).json({
            status: 401,
            message:
              process.env.NODE_ENV === "development"
                ? `Contract ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: contract,
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

  controllers.getContracts = async (req, res, next) => {
    await Contract.find(req.query)
      .populate({
        path: "job",
        model: "job",
      })
      .populate({
        path: "client",
        model: "user",
        select: {
          username: 1,
          bsLocation: 1,
          profileImage: 1,
          timeZone: 1,
        },
      })
      .populate({
        path: "vendor",
        model: "user",
        select: {
          username: 1,
          bsLocation: 1,
          profileImage: 1,
          timeZone: 1,
        },
      })
      .populate({
        path: "reviews",
        model: "review",
        populate: [
          {
            path: "from",
            model: "user",
            select: {
              username: 1,
            },
          },
          {
            path: "to",
            model: "user",
            select: {
              username: 1,
            },
          },
        ],
      })
      .then(async (contracts) => {
        return res.status(200).json({
          status: 200,
          data: contracts,
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
