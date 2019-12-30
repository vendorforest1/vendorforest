// @ts-nocheck
import express from "express";
import expressValidation from "express-joi-validation";

import getUserCtl from "@Controllers/userController";
import { isAuthenticatedForApi } from "@Utils/middleware";
import {
  getUser,
  login,
  register,
  resetPass,
  sendCodeEmail,
  updateAccount,
} from "./validation";

const router = express.Router();
const validator = expressValidation.createValidator({ passError: true });

export default function(app, passport) {
  const userCtr = getUserCtl(passport);

  router.post("/login", validator.body(login.body), userCtr.login);
  router.post("/register", validator.body(register.body), userCtr.register);
  router.get(
    "/get_user",
    isAuthenticatedForApi,
    validator.query(getUser.query),
    userCtr.getUser,
  );
  router.get("/users", isAuthenticatedForApi, userCtr.getAllUsers);
  router.get("/emailsent/:id", userCtr.emailSent);
  router.get("/confirmation/:token", userCtr.confirmationPost);
  router.get("/authToken/:token", userCtr.autheticate);
  // router.post("/compare_pw", userCtr.comparePW)
  router.get(
    "/codeemail_send/:email",
    isAuthenticatedForApi,
    validator.params(sendCodeEmail.params),
    userCtr.sendCodeEmail,
  );
  router.post(
    "/account",
    isAuthenticatedForApi,
    validator.body(updateAccount.body),
    userCtr.updateAccount,
  );
  router.post(
    "/resetpass",
    isAuthenticatedForApi,
    validator.body(resetPass.body),
    userCtr.resetPass,
  );
  router.post("/forgotPassword", validator.body(resetPass.body), userCtr.forgotPassword);
  router.post("/resetpw", userCtr.sendResetPasswordEmail);
  router.get("/userinfo", userCtr.userInfo);
  router.get("/clientinfo", userCtr.clientInfo);
  router.get("/get_nav_notifications", userCtr.getNavNotifications);
  router.post("/check_noti", userCtr.checkNotification);
  router.get("/get_badge", userCtr.getBadge);
  return router;
}
