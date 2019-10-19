import mongoose from "mongoose";
import { constants } from "@Config/index";

const ReviewSchema = new mongoose.Schema(
  {
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "contract",
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    rate: {
      type: Number,
      default: 5.0,
    },
    feedback: {
      type: String,
      required: true,
    },
    endReason: {
      type: Number,
      default: constants.ENDCONTRACT_REASON.COMPLETED,
    },
    recommend: {
      type: Number,
      default: 0,
    },
    // rate: {
    //   type: Number,
    //   default: 0,
    // },
    vendorBadge: {
      type: Number,
      default: constants.VENDOR_BADGES.NONE,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

ReviewSchema.post("init", function(doc) {
  // console.log("init hook", doc)
});

export default mongoose.model("review", ReviewSchema);