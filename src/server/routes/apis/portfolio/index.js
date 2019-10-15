import express from "express";
import expressValidation from "express-joi-validation";

import getPortfolioCtr from "@Controllers/portfolioController";
import { isAuthenticatedForApi } from "@Utils/middleware";

import { get, getMyPortfolios, getPortfolios, create, update } from "./validation";

const router = express.Router();
const validator = expressValidation.createValidator({ passError: true });

const portfolioCtr = getPortfolioCtr();

// export default function(app, passport) {
router.use(isAuthenticatedForApi);
router.get("/get", validator.query(get.query), portfolioCtr.get);
router.get("/get_portfolios", validator.body(getPortfolios.query), portfolioCtr.getPortfolios);
router.get(
  "/get_myportfolios",
  validator.body(getMyPortfolios.query),
  portfolioCtr.getMyPortfolios,
);
router.post("/create", validator.body(create.body), portfolioCtr.create);
router.post("/update", validator.body(update.body), portfolioCtr.update);
//   return router;
// }
export default router;
