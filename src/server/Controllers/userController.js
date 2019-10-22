// @ts-nocheck
import crypto from "crypto";
//import passport from'passport';
import User from "@Models/user.model";
import Token from "@Models/token.model";
import Client from "@Models/client.model";
import Vendor from "@Models/vendor.model";
import mailService from "@Config/mail";
import geoip from 'geoip-lite';
import getEnv, { constants } from "@Config/index";

const env = getEnv();

export default function(passport) {
  const controllers = {};
  const mail = mailService({
    user: "helpdesk@sequentialflow.com",
    clientId: "505933082658-hcp57en4mu7rg2af3ril32a1mdtiuso5.apps.googleusercontent.com",
    clientSecret: "DS3ROvZkscENoanNLzZc-9VF",
    accessToken:
      "ya29.GlslB9eXbQ3KQXDzHIZSnB8RR2JXArQRcQzxC2MbLMENoUAET0Omz1ZcAvfkIDCwsS6jwwAyoWDsSaH1BAoSaf8T-O5SKzEJ3ZgEuWCULpOGhgZSKGxFqj0xPkTM",
    scope: "https://mail.google.com/",
    tokenType: "Bearer",
    expiresIn: 3600,
    refreshToken: "1/4nir3cGlLFiq_lYvygcSn9WLJBea9mK6IoIxo74FcFM",
  });

  controllers.getAllUsers = function(req, res, rext) {
    let query = User.find({});
    query.exec((err, users) => {
      if (err) {
        return res.json(err);
      }
      return res.json({
        users: users,
      });
    });
  };

  controllers.resendTokenPost = function(req, res, next) {};

  controllers.updateUser = function(req, res, next) {};

  //deactivate not delete
  controllers.deActivateUser = function(req, res, next) {};

  controllers.login = function(req, res, next) {
    try {
      var get_ip = require('ipware')().get_ip;
      var geo = geoip.lookup("192.168.0.225");
      console.log(geo)
      if (!req.isAuthenticated()) {
        passport.authenticate("local", (err, userObject) => {
          if (err) {
            console.log("Hit /apis/login endpoint!! err: ", err);

            return res.status(401).send(err);
          }
          console.log("Hit /apis/login endpoint!! before: ", userObject);

          if (!userObject) {
            return res.status(401).send({
              msg: "Error occured",
            });
          }

          console.log("Hit /apis/login endpoint!! ", userObject);

          req.login(userObject.userObj, (err) => {
            if (err) {
              return res.status(401).send(err);
            } //next(err);
            return res.status(200).send(userObject);
          });
        })(req, res, next);
      } else {
        return next();
      }
    } catch (e) {
      console.log("Errror: ", e);
    }
  };

  controllers.getUser = async (req, res, next) => {
    await User.findById(req.user._id)
      .populate("client")
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

  controllers.register = async function(req, res, next) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      accountType: req.body.accountType,
    };

    //use schema.create to insert data into the db
    const newUser = new User(userData);

    await newUser.save(async function(err, user) {
      if (err) {
        return res.status(500).json({
          status: 500,
          type: err.name,
          msg: err.message,
          errors: err.errors,
        });
      }

      // Create a verification token for this user
      const token = new Token({
        _userId: user._id,
        email: user.email,
        token: crypto.randomBytes(16).toString("hex"),
      });

      await token.save(async function(err) {
        if (err) {
          console.log("TOKEN ERR: ", err);
          return res.status(500).json({
            status: 500,
            msg: err.message,
          });
        }

        mail.welcome(req, user, token.token);

        return res.status(200).json({
          status: 200,
          id: user._id,
          msg: "A verification email has been sent to " + user.email + ".",
        });
      });
    });
  };

  controllers.emailSent = async (req, res, next) => {
    await User.findById(
      {
        _id: req.params.id,
      },
      async (error, user) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
        if (!user) {
          return res.status(401).json({
            status: 401,
            message: "User doens't exist. Please register again.",
          });
        }
        if (user && user.isVerified) {
          return res.status(402).json({
            status: 402,
            message: "You has been verified already. Please login",
          });
        }
        await Token.findOneAndUpdate(
          {
            _userId: user._id,
          },
          {
            _userId: user._id,
            email: user.email,
            token: crypto.randomBytes(16).toString("hex"),
          },
          {
            upsert: true,
            new: true,
          },
          async (error, token) => {
            if (error) {
              return res.status(500).json({
                status: 500,
                message: error.message,
              });
            }
            mail.welcome(req, user, token.token);
            return res.status(200).json({
              status: 200,
              message: "A verification email has been sent to " + user.email + ".",
            });
          },
        );
      },
    );
  };

  controllers.sendCodeEmail = async (req, res, next) => {
    await User.findOne(
      {
        email: req.params.email,
      },
      async (error, user) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
        if (user) {
          return res.status(401).json({
            status: 401,
            message: "This email has been used by another account.",
          });
        }
        const verifyCode = Math.floor(Math.random() * 8999) + 1000;
        console.log(verifyCode);
        await Token.findOneAndUpdate(
          {
            _userId: req.user._id,
          },
          {
            _userId: req.user._id,
            email: req.params.email,
            code: verifyCode,
          },
          {
            upsert: true,
            new: true,
          },
          async (error, token) => {
            if (error) {
              return res.status(500).json({
                status: 500,
                message: error.message,
              });
            }
            // mail.welcome(req, user, token.token);
            return res.status(200).json({
              status: 200,
              message: "A verification code has been sent to " + req.params.email + ".",
            });
          },
        );
      },
    );
  };

  controllers.confirmationPost = async (req, res, next) => {
    // Find a matching token
    await Token.findOne(
      {
        token: req.params.token,
      },
      async (err, token) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: err.message,
          });
        }
        if (!token) {
          return res.status(402).send({
            status: 402,
            message:
              "We were unable to find a valid token. Your token may have expired. Please login",
          });
        }
        // If we found a token, find a matching user
        await User.findOne(
          {
            _id: token._userId,
          },
          async (err, user) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                message: err.message,
              });
            }
            if (!user) {
              return res.status(401).send({
                status: 401,
                message: "User doesn't exist. Please register again.",
              });
            }

            // Verify and save the user
            await Token.findOneAndRemove(
              {
                _id: token._id,
              },
              async (error, token) => {
                if (err) {
                  return res.status(500).json({
                    status: 500,
                    message: err.message,
                  });
                }
                let updateData = {
                  isVerified: true,
                  isConfirmed: true,
                };
                if (user.accountType === constants.ACCOUNT_TYPE.CLIENT) {
                  const client = await Client.create({});
                  updateData.client = client._id;
                } else if (user.accountType === constants.ACCOUNT_TYPE.VENDOR) {
                  const vendor = await Vendor.create({});
                  updateData.vendor = vendor._id;
                }
                await User.findOneAndUpdate(
                  {
                    _id: user._id,
                  },
                  updateData,
                  async (err, user) => {
                    if (err) {
                      return res.status(500).send({
                        status: 500,
                        msg: err.message,
                      });
                    }
                    return res.status(200).send({
                      status: 200,
                    });
                  },
                );
              },
            );
          },
        );
      },
    );
  };

  controllers.updateAccount = async (req, res, next) => {
    if (req.body.verifyCode) {
      await Token.findOne({
        email: req.body.email,
      })
        .then(async (token) => {
          if (!token) {
            return res.status(402).send({
              status: 402,
              message:
                "We were unable to find a valid code. Your code may have expired. Please verify again",
            });
          }
          if (token.code !== req.body.verifyCode) {
            return res.status(402).send({
              status: 402,
              message: "Invalid veryfy code",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            status: 500,
            message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
          });
        });
    }
    await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      req.body,
      {
        new: true,
      },
    )
      .populate("client")
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
          message: "Account has been updated.",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message: env.MODE === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };

  controllers.resetPass = async (req, res, next) => {
    await User.findById({
      _id: req.user._id,
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
        await user
          .verifyPassword(req.body.oldPass)
          .then(async (isMatch) => {
            if (!isMatch) {
              return res.status(403).json({
                status: 400,
                message: "Invalid old password",
              });
            }
            await User.findOneAndUpdate(
              {
                _id: req.user._id,
              },
              {
                $set: { password: req.body.newPass },
              },
            )
              .then(async () => {
                return res.status(200).json({
                  status: 200,
                  message: "Passward has been reset",
                });
              })
              .catch((error) => {
                throw new Error(error.message);
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

  return controllers;
}
