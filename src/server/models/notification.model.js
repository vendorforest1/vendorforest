import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
    },
    notificationMsg: String,
    time: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model("notification", NotificationSchema);
