import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {},
  {
    versionKey: false,
    timestamps: true,
  },
);

employeeSchema.post("init", function(doc) {
  // console.log("init hook", doc)
});

export default mongoose.model("employee", employeeSchema);
