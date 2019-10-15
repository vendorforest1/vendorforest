import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
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

CategorySchema.post("init", function(doc) {
  // console.log("init hook", doc)
});

export default mongoose.model("category", CategorySchema);
