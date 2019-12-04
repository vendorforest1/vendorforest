import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import util from "util";
import Styliner from "styliner";
import os from "os";
import getEnv, { constants } from "@Config/index";

import { OAuth2Client } from "google-auth-library";
// require('whatwg-fetch')
// import { google } from "googleapis";

const readline = require("readline");

const readFile = util.promisify(fs.readFile);
// const OAuth2 = google.auth.OAuth2;
const env = getEnv();

const mailService = () => {
  const oauth = {
    user: env.SUPPORT_EMAIL,
    client_id: env.OAUTH_CLIENT_ID,
    client_secret: env.OAUTH_SECRET,
    accessToken: env.OAUTH_TOKEN,
    scope: env.OAUTH_SCOPE,
    tokenType: "Bearer",
    expiresIn: 3600,
    refresh_token: env.OAUTH_REFRESH_TOKEN,
  };
  const mailObject = {};
  const hostname = os.hostname();

  const clientFile = "email_client_welcome.html";
  const vendorFile = "email_vendor_welcome.html";
  const baseDir = "./public";
  const uncDrive = "\\\\" + hostname + "\\DevTC";
  const uncPath = baseDir.replace(/.*DevTC/gi, uncDrive);
  // If modifying these scopes, delete token.json.
  const SCOPES = ["https://mail.google.com/"];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = "token.json";

  const oauth2Client = new OAuth2Client(
    {
      clientId: oauth.client_id,
      clientSecret: oauth.client_secret,
      redirectUri: "https://vendorforest.com",
    }, // Redirect URL
  );

  console.log("befpre: ", oauth);
  const authObject = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: oauth.user,
      clientId: oauth.client_id,
      clientSecret: oauth.client_secret,
      refreshToken: oauth.refresh_token,
      accessToken: "",
    },
  };
  let transporter, accessToken;

  // prependUNCPath is a function called by Styliner for every
  // link that is found in the HTML.
  function prependUNCPath(path, type) {
    return uncPath + path;
  }

  async function read(filePath) {
    const content = await readFile(path.resolve(baseDir, filePath), "utf8");
    return content;
  }

  let styliner = new Styliner(baseDir, {
    url: prependUNCPath,
    noCSS: true,
  });

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param oAuth2Client The OAuth2 client to get token for.
   * @param  callback The callback for the authorized client.
   */
  const getNewToken = (oAuth2Client, callback) => {
    try {
      oauth2Client.setCredentials({
        refresh_token: oauth.refresh_token,
      });

      oAuth2Client
        .getRequestHeaders()
        .then((accessToken) => {
          callback(accessToken);
        })
        .catch((e) => env.MODE === "development" && console.log(e));
    } catch (err) {
      console.error(err);
    }
  };

  const transportMail = (mailOptions, callback) => {
    return getNewToken(oauth2Client, async (accessToken) => {
      authObject.auth.accessToken = accessToken;

      console.log("**** access: ", authObject);
      try {
        transporter = nodemailer.createTransport({ ...authObject });
        await transporter.sendMail(mailOptions, (error, response) => {
          if (error) {
            return callback(error, error.message);
          }

          transporter.close();
        });

        return callback(undefined, "mail sent");
      } catch (e) {
        return callback(e, e.message);
      }
    });
  };
  mailObject.sendEmail = async (userEmail, subject, body, callback) => {
    const mailOptions = {
      from: `${oauth.user}`, // sender address
      to: `${userEmail}`, // list of receivers
      //generateTextFromHTML: true,
      subject: subject, // Subject line
      html: body,
    };
    console.log("1**** access: ", authObject);

    transportMail(mailOptions, callback);
  };
  mailObject.welcome = async (req, user, token) => {
    try {
      const fileName =
        user.accountType === constants.ACCOUNT_TYPE.CLIENT ? clientFile : vendorFile;

      const callback = (accessToken) => {
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: oauth.user,
            clientId: oauth.client_id,
            clientSecret: oauth.client_secret,
            refreshToken: oauth.refresh_token,
            accessToken: accessToken,
          },
        });

        const mailOptions = {
          from: `${oauth.user}`, // sender address
          to: `${user.email}`, // list of receivers
          //generateTextFromHTML: true,
          subject: `Welcome to Vendorforest`, // Subject line
          html: ``,
        };

        read(fileName)
          .then((data) => {
            styliner
              .processHTML(data)
              .then(async (source) => {
                const userNamePattern = /{user}/i;
                const cofirmationUrlPattern = /{confirmUrl}/i;
                const href = `${
                  req.connection && req.connection.encrypted ? "https" : "http"
                }://${req.headers.host}/confirmation/${token}`;

                source = source.replace(
                  cofirmationUrlPattern,
                  `<a href=${href} target="_blank">${href}</a>`,
                );

                source = user.firstName
                  ? source.replace(userNamePattern, user.firstName)
                  : source.replace(userNamePattern, user.username);

                mailOptions.html = source;

                // send mail with defined transport object
                await transporter.sendMail(mailOptions, (error, response) => {
                  if (error) {
                  }
                  transporter.close();
                });

                // That last brace is to close off async function
              })
              .catch((err) => err);
          })
          .catch((err) => err);
      };

      getNewToken(oauth2Client, callback);
    } catch (err) {
      console.error(err);
    }
    // setup e-mail data with unicode symbols
  };

  return mailObject;
};

export const mail = mailService();
