import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Dummy interface
export interface IDummy extends Document {
  name: string;
  desc: string;
}

// Define the schema
const DummySchema: Schema<IDummy> = new Schema<IDummy>(
  {
    name: { type: String, required: true },
    desc: { type: String },
  },
  {
    timestamps: true,
  }
);

//Model
const Dummy: Model<IDummy> =
  mongoose.models.Dummy || mongoose.model<IDummy>("Dummy", DummySchema);

export default Dummy;
