import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import util from "util";
import Styliner from "styliner";
import os from "os";
import { constants } from "@Config/index";

import { google } from "googleapis";

const readFile = util.promisify(fs.readFile);
const OAuth2 = google.auth.OAuth2;

export default (oauth) => {
  const mailObject = {};
  const hostname = os.hostname();

  const clientFile = "email_client_welcome.html";
  const vendorFile = "email_vendor_welcome.html";
  const baseDir = "./public";
  const uncDrive = "\\\\" + hostname + "\\DevTC";
  const uncPath = baseDir.replace(/.*DevTC/gi, uncDrive);

  const oauth2Client = new OAuth2(
    oauth.client_id,
    oauth.client_secret,
    "https://developers.google.com/oauthplayground", // Redirect URL
  );

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

  mailObject.welcome = async (req, user, token) => {
    try {
      const fileName =
        user.accountType === constants.ACCOUNT_TYPE.CLIENT ? clientFile : vendorFile;

      oauth2Client.setCredentials({
        refresh_token: oauth.refresh_token,
      });

      const tokens = await oauth2Client.refreshAccessToken();

      accessToken = tokens.credentials.access_token;

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
    } catch (err) {
      console.error(err);
    }
    // setup e-mail data with unicode symbols
  };
  return mailObject;
};
