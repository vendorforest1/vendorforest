import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    attachImgFiles: [
      {
        _id: false,
        name: String,
        uid: String,
        status: String,
        url: String,
      },
    ],
    attachVidFiles: [
      {
        _id: false,
        name: String,
        uid: String,
        status: String,
        url: String,
      },
    ],
    coverImage: {
      _id: false,
      name: String,
      uid: String,
      status: String,
      url: String,
    },
    caption: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

PortfolioSchema.post("init", function(doc) {
  // env.MODE === "development" && console.log("init hook", doc)
});

export default mongoose.model("portfolio", PortfolioSchema);
