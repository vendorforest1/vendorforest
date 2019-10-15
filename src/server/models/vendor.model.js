import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
  {
    jobComplatedReate: {
      type: Number,
      default: 0,
    },
    rate: {
      type: Number,
      default: 0,
    },
    jobs: {
      type: Number,
      default: 0,
    },
    hoursWorked: {
      type: Number,
      default: 0,
    },
    totalEarning: {
      type: Number,
      default: 0,
    },
    hourlyRate: {
      type: Number,
      default: 30.0,
    },
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
    successRate: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    subCategories: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

VendorSchema.post("init", function(doc) {
  // console.log("init hook", doc)
});

export default mongoose.model("vendor", VendorSchema);
