import mongoose from "mongoose";

const interestSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    about: { type: String },
    imgUrl: { type: String },
  },
  { timestamps: true }
);

const InsterestModel =
  mongoose.models.Insterest || mongoose.model("Insterest", interestSchema);

export default InsterestModel;
