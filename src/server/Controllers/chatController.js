import Job from "@Models/job.model";
import User from "@Models/user.model";
import Chat from "@Models/chat.model";
import socketio from "socket.io";
import http from "http";
import express from "express";
import getEnv, { constants } from "@Config/index";
import { async } from "q";

const env = getEnv();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

export default () => {
  const controllers = {};

  controllers.getConnectedUser = async (req, res) => {
    const myName = req.user.username;
    console.log("MY NAME IS", myName);
    let from = { from: myName };
    let to = { to: myName };
    await Chat.find({ $or: [from, to] })
      .sort({
        createdAt: -1,
      })
      .then(async (connectedUsers) => {
        return res.status(200).json({
          status: 200,
          data: connectedUsers,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 500,
          message:
            process.env.NODE_ENV === "development" ? error.message : constants.PROD_COMMONERROR_MSG,
        });
      });
  };
  return controllers;
};
