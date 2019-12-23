import Job from "@Models/job.model";
import Proposal from "@Models/proposal.model";
import Contract from "@Models/contract.model";
import Vendor from "@Models/vendor.model";
import Client from "@Models/client.model";
import getEnv, { constants } from "@Config/index";
import { async } from "q";

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
                env.MODE === "development"
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
                  env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
              env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
          // select: {
          //   username: 1,
          //   bsLocation: 1,
          //   profileImage: 1,
          //   timeZone: 1,
          // },
        },
      })
      .populate({
        path: "vendor",
        model: "user",
        populate: {
          path: "vendor",
          model: "vendor",
          // select: {
          //   username: 1,
          //   bsLocation: 1,
          //   profileImage: 1,
          //   timeZone: 1,
          // },
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
              env.MODE === "development"
                ? `Contract ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        await Client.findOneAndUpdate(
          {
            _id: req.user.client,
          },
          {
            $inc: {
              totalSpent: contract.paidPrice,
            },
          },
        ).then(() => {});
        // console.log("end contract === ", contract);
        const vendorModelId = contract.vendor.vendor._id;
        const paidPrice = contract.paidPrice;
        const jobCompletedRate = paidPrice !== 0 ? 100 : 0;
        await Vendor.findOneAndUpdate(
          {
            _id: vendorModelId,
          },
          {
            $inc: {
              totalEarning: paidPrice,
              jobComplatedReate: jobCompletedRate,
              jobs: 1,
            },
          },
        )
          .then((result) => {
            // console.log("after saving", result);
            return res.status(200).json({
              status: 200,
              data: result,
              message: "Contract has been ended successfully.",
            });
          })
          .catch((error) => {
            return res.status(500).json({
              status: 500,
              message:
                env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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

  controllers.updateHireProposal = async (req, res) => {
    // console.log(req.body);
    await Contract.findOneAndUpdate(
      {
        _id: req.body.contract,
      },
      {
        budget: req.body.updatePrice,
      },
      {
        new: true,
      },
    )
      .then(async () => {
        await Job.findOneAndUpdate(
          {
            _id: req.body.job,
          },
          {
            title: req.body.updateTitle,
            description: req.body.updateDescription,
          },
          {
            new: true,
          },
        )
          .then(async (result) => {
            return res.status(200).json({
              status: 200,
              message: `Your proposal has been updated successfully.`,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              status: 500,
              message: `${error} Failed to update. Please try again.`,
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

  controllers.getHireDetail = async (req, res) => {
    const jobId = req.body.job_id;
    const vendorId = req.body.vendor_id;
    await Contract.findOne({
      job: jobId,
      vendor: vendorId,
    })
      .populate({
        path: "vendor",
        model: "user",
      })
      .populate({
        path: "proposal",
        model: "proposal",
      })
      .populate({
        path: "job",
        model: "job",
        populate: [
          {
            path: "category",
            model: "category",
          },
          {
            path: "service",
            model: "service",
          },
        ],
      })
      .then(async (result) => {
        return res.status(200).json({
          status: 200,
          data: result,
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
              env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  return controllers;
};
