import express from "express"; //;
import client from "./client"; //;
import vendor from "./vendor"; //;
import review from "./review"; //;
import portfolio from "./portfolio"; //.default;
import home from "./home"
import job from "./job"; //;
import proposal from "./proposal"; //.default;
import offer from "./offer"; //;
import contract from "./contract"; //.default;
import milestone from "./milestone"; //;
import service from "./service"; //.default;
import team from "./team"; //;
import user from "./user"; //;

import {
    paymentRouter
} from "@Routes/apis/PaymentSystem";

export default function (app, passport) {
    const router = express.Router();

    router.use("/job", job);
    router.use("/client", client);
    router.use("/vendor", vendor);
    router.use("/review", review);
    router.use("/portfolio", portfolio);
    router.use("/proposal", proposal);
    router.use("/offer", offer);
    router.use("/contract", contract);
    router.use("/service", service);
    router.use("/team", team);
    router.use("/milestone", milestone);
    router.use("/payment", paymentRouter);
    router.use("/home", home);
    router.use("/", user(app, passport));
    router.use((err, req, res, next) => {
        console.log("router Error", err);
        if (err && err.error && err.error.isJoi) {
            return res.status(400).json({
                status: 400,
                message: err.error.toString(),
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: err.toString(),
            });
        }
    });
    return router;
}