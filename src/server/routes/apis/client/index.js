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
router.post("/update_clientid", clientCtrl.updateClientId);
router.get("/get_card_digits", clientCtrl.getCardDigits);

router.post("/billing", clientCtrl.updateBillingInformation);
router.get("/settings", clientCtrl.getClient);
router.post(
  "/notification",
  validator.body(updateNotifySettings.body),
  clientCtrl.updateNotifySettings,
);

router.post("/getnotifications", clientCtrl.getNotifications);
router.post("/get_deleted_notifications", clientCtrl.getDeletedNotifications);
router.post("/del_notification", clientCtrl.delNotification);
export default router;
