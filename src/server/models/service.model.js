import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

ServiceSchema.post("init", function(doc) {
  // console.log("init hook", doc)
});

export default mongoose.model("service", ServiceSchema);
