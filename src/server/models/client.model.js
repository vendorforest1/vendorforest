import mongoose from "mongoose";
import { string } from "prop-types";

const ClientSchema = new mongoose.Schema(
  {
    billingMethod: {
      type: Number,
      default: 0,
    },
    creditCard: {
      _id: false,
      cardNumber: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      expMonth: {
        type: String,
      },
      expYear: {
        type: String,
      },
      securityCode: {
        type: String,
      },
    },
    stripe_client_id: {
      type: String,
    },
    paypal: {
      type: String,
    },
    notification: {
      _id: false,
      showNotification: {
        type: Number,
        default: 0,
      },
      increaseMsg: {
        type: Number,
        default: 0,
      },
      emailUnread: {
        type: Number,
        default: 0,
      },
      emailUnreadTime: {
        type: Number,
        default: 0,
      },
      offlineNoti: {
        type: Boolean,
        default: false,
      },
      pushNoties: [
        {
          type: Number,
        },
      ],
      emailMe: [
        {
          type: Number,
        },
      ],
    },
    rate: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    avgHourlyRate: {
      type: Number,
    },
    hireRate: {
      type: Number,
    },
    postedJobs: {
      type: Number,
      default: 0,
    },
    openJobs: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

ClientSchema.post("init", function(doc) {
  // env.MODE === "development" && console.log("init hook", doc)
});

export default mongoose.model("client", ClientSchema);
