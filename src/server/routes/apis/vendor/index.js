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

router.use(isAuthenticatedForApi);
router.get("/get", vendorCtr.get);
router.get("/find", validator.query(find.query), vendorCtr.find);
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