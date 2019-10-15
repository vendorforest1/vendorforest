import express from "express";
import expressValidation from "express-joi-validation";

import getContractCtr from "@Controllers/contractController";
import { isAuthenticatedForApi } from "@Utils/middleware";
import { create, get, end, getContracts, update } from "./validation";

const router = express.Router();
const contractCtr = getContractCtr();
const validator = expressValidation.createValidator({ passError: true });

router.use(isAuthenticatedForApi);
router.post("/create", validator.body(create.body), contractCtr.create);
router.post("/update", validator.body(update.body), contractCtr.update);
router.post("/end", validator.body(end.body), contractCtr.end);
router.get("/get", validator.query(get.query), contractCtr.get);
router.get("/get_contracts", validator.query(getContracts.query), contractCtr.getContracts);

export default router;
