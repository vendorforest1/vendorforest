import express from "express";
import { constants } from "@Config/index";
// import userController from "@Controllers/userController";

const router = express.Router();
router.get("/register", function(req, res, next) {
  if (!req.user) {
    return next();
  } else {
    //specify which profile page
    if (req.user.accountType === constants.ACCOUNT_TYPE.VENDOR) {
      res.redirect(`/${constants.ACCOUNTTYPES[req.user.accountType]}/findjob`);
    } else {
      res.redirect(`/${constants.ACCOUNTTYPES[req.user.accountType]}`);
    }
  }
});

router.get("/DEMO", function(req, res, next) {
  console.log(req.session, " **** ", req.user);
  if (!req.user) {
    res.status(300).json({ user: undefined });
  } else {
    res.status(200).json({ ...req.user });
  }
});

router.get("/login", function(req, res, next) {
  if (!req.user) {
    return next();
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

export default router;
