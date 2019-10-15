import express from "express";
import { constants } from "@Config/index";
// import userController from "@Controllers/userController";

const router = express.Router();

// export default function(app, passport) {
// const userCtr = userController(passport);

router.get("/register", function(req, res, next) {
  if (!req.user) {
    next();
  } else {
    //specify which profile page
    if (req.user.accountType === constants.ACCOUNT_TYPE.VENDOR) {
      res.redirect(`/${constants.ACCOUNTTYPES[req.user.accountType]}/findjob`);
    } else {
      res.redirect(`/${constants.ACCOUNTTYPES[req.user.accountType]}`);
    }
  }
});

router.get("/login", function(req, res, next) {
  if (!req.user) {
    next();
  } else {
    //specify which profile page
    if (req.user.accountType === constants.ACCOUNT_TYPE.VENDOR) {
      res.redirect(`/${constants.ACCOUNTTYPES[req.user.accountType]}/findjob`);
    } else {
      res.redirect(`/${constants.ACCOUNTTYPES[req.user.accountType]}`);
    }
  }
});

router.get("/logout", (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logOut();
    req.session.destroy();
    return res.redirect("/login"); // Handle valid logout
  }
  return res.redirect(401, "/err"); // Handle unauthenticated response
});

// return router;
// }
export default router;
