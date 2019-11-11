import express from "express";
import expressValidation from "express-joi-validation";

import { isAuthenticatedForApi } from "@Utils/middleware";
import getClientCtl from "@Controllers/clientController";
import updateNotifySettings from "./validation";

const router = express.Router();
const clientCtrl = getClientCtl();
const validator = expressValidation.createValidator({ passError: true });

router.use(isAuthenticatedForApi);
router.get("/getpubkey", clientCtrl.getPubKey);
router.post("/getsetupintent", clientCtrl.getSetupIntent);
router.post("/getclientid", clientCtrl.getClientId);

router.post("/billing", clientCtrl.updateBillingInformation);
router.get("/settings", clientCtrl.getClient);
router.post(
  "/notification",
  validator.body(updateNotifySettings.body),
  clientCtrl.updateNotifySettings,
);

export default router;
