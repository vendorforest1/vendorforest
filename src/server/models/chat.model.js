import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    msg: String,
    time: String,
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model("chat", ChatSchema);
