import Team from "../models/team.model";
// const Vendor = require("../models/vendor.model");
// const User = require("../models/user.model");
import getEnv, { constants } from "@Config/index";

const config = getEnv();
export default () => {
  const controllers = {};

  controllers.get = async (req, res, next) => {
    await Team.findById(req.query._id)
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
        if (!team) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `Team ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: team,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          status: 500,
          message:
            config.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.getTeams = async (req, res, next) => {
    await Team.find({
      $or: [
        {
          admin: req.user._id,
        },
        {
          members: req.user._id,
        },
        {
          invitedUsers: req.user._id,
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
        if (!team) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `Team ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: team,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          status: 500,
          message:
            config.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.create = async (req, res, next) => {
    const teamDoc = new Team(req.body);
    await teamDoc
      .save()
      .then(async (team) => {
        return res.status(200).json({
          status: 200,
          data: team,
          message: "Team has been created.",
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
    await Team.findOneAndUpdate(
      {
        _id: req.body._id,
        admin: req.user._id,
      },
      req.body,
      {
        new: true,
      },
    )
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
        if (!team) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `Team ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: team,
          message: "Team has been updated.",
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

  controllers.inviteUsers = async (req, res, next) => {
    await Team.findOneAndUpdate(
      {
        _id: req.body._id,
        admin: req.user._id,
      },
      {
        $push: {
          invitedUsers: req.body.invitedUsers,
        },
      },
      {
        new: true,
      },
    )
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
        if (!team) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `Team ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: team,
          message: "Members has been invited successfully.",
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

  controllers.inviteAccept = async (req, res, next) => {
    await Team.findOneAndUpdate(
      {
        _id: req.body._id,
        invitedUsers: req.body.invitedUser,
      },
      {
        $push: {
          members: req.body.invitedUser,
        },
        $pull: {
          invitedUsers: req.body.invitedUser,
        },
      },
      {
        new: true,
      },
    )
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
        if (!team) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `Team ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: team,
          message: "Invitation has been accepted successfully.",
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

  controllers.inviteDecline = async (req, res, next) => {
    await Team.findOneAndUpdate(
      {
        _id: req.body._id,
        invitedUsers: req.body.invitedUser,
      },
      {
        $pull: {
          invitedUsers: req.body.invitedUser,
        },
      },
      {
        new: true,
      },
    )
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
        if (!team) {
          return res.status(401).json({
            status: 401,
            message:
              config.env.NODE_ENV === "development"
                ? `Team ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: team,
          message: "Invitation has been decline.",
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