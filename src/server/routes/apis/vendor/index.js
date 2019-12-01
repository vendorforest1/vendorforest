// @ts-nocheck
import express from "express";
import expressValidation from "express-joi-validation";

import getVendorCtr from "@Controllers/vendorController";
import { isAuthenticatedForApi } from "@Utils/middleware";
import {
  find,
  searchVendorInRadius,
  update,
  updateCompany,
  updateNotifySettings,
} from "./validation";

const router = express.Router();
const vendorCtr = getVendorCtr();
const validator = expressValidation.createValidator({ passError: true });

router.get("/get", isAuthenticatedForApi, vendorCtr.get);
router.get("/:username", validator.query(find.query), vendorCtr.findVendorByUserName);

router.use(isAuthenticatedForApi);
router.get("/find", validator.query(find.query), vendorCtr.find);
router.get("/getvendor", validator.query(find.query), vendorCtr.getVendor);
router.post("/update", validator.body(update.body), vendorCtr.update);
router.post(
  "/notification",
  validator.body(updateNotifySettings.body),
  vendorCtr.updateNotifySettings,
);
router.post("/update_company", validator.body(updateCompany.body), vendorCtr.updateCompany);
router.post(
  "/search_inradius",
  validator.body(searchVendorInRadius.body),
  vendorCtr.searchVendorInRadius,
);

export default router;
