import Team from "../models/team.model";
import getEnv, { constants } from "@Config/index";
import User from "@Models/user.model";
import { mail } from "@Config/mail";
import saveNotification from "@Config/notification";
import sendSMS from "@Config/sms";

const env = getEnv();

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
              env.MODE === "development"
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
        env.MODE === "development" && console.log(error);
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
              env.MODE === "development"
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
        env.MODE === "development" && console.log(error);
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.create = async (req, res, next) => {
    const teamDoc = new Team(req.body);
    await teamDoc
      .save()
      .then(async (team) => {
        await team.members.map((member) => {
          User.findOne({
            _id: member,
          })
          .then(async (vendorInfo) => {
            const vendorId = vendorInfo._id;
            const notificationDescription = `You have been invited to "${req.body.name}" team.`;
            const vendorPhone = vendorInfo.phone;
            const vendorTitle = "Vendorforest Info!";
            const smsDescription = `You have been invited to ${req.body.name} team. \n vendorforest.com`;
            saveNotification(vendorId, notificationDescription, `/vendor/team/${team._id}`);
            sendSMS(vendorPhone, vendorTitle, smsDescription);
            const emailContent = {
              teamName: req.body.name,
              username: vendorInfo.username,
              email: vendorInfo.email,
            };
            await mail.sendInvitingEmail(
              emailContent,
              "VendorForest information!",
              (err, msg) => {
                if (err) {
                  return err;
                }
                return;
              },
            );
          });
        });
        // User.findOneAndUpdate(
        //   {
        //     _id: req.user._id,
        //   },
        //   {
        //     $inc: {
        //       profilePercent: 34,
        //     },
        //   },
        // ).then(() => {});
        return res.status(200).json({
          status: 200,
          data: team,
          message: "Team has been created.",
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
              env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
              env.MODE === "development"
                ? `Team ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        await team.invitedUsers.map(async (invitedUser) => {
          const vendorId = invitedUser._id;
          const notificationDescription = `You have been invited to "${team.name}" team.`;
          const vendorPhone = invitedUser.phone;
          const vendorTitle = "Vendorforest Info!";
          const smsDescription = `You have been invited to ${team.name} team. \n vendorforest.com`;
          saveNotification(vendorId, notificationDescription, `/vendor/team/${team._id}`);
          sendSMS(vendorPhone, vendorTitle, smsDescription);
          const emailContent = {
            teamName: team.name,
            username: invitedUser.username,
            email: invitedUser.email,
          };
          await mail.sendInvitingEmail(
            emailContent,
            "VendorForest information!",
            (err, msg) => {
              if (err) {
                return err;
              }
              return;
            },
          );
        });
        return res.status(200).json({
          status: 200,
          data: team,
          message: "Members has been invited successfully.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
              env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
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
              env.MODE === "development"
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
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.memberDecline = async (req, res, next) => {
    await Team.findOneAndUpdate(
      {
        _id: req.body._id,
        members: req.body.memberId,
      },
      {
        $pull: {
          members: req.body.memberId,
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
              env.MODE === "development"
                ? `Team ${constants.DEV_EMPTYDOC_MSG}`
                : constants.PROD_COMMONERROR_MSG,
          });
        }
        return res.status(200).json({
          status: 200,
          data: team,
          message: "Member has been deleted.",
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
