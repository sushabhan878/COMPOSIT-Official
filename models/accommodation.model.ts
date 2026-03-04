import mongoose from "mongoose";

export interface IAccommodation {}

const accommodationSchema = new mongoose.Schema<IAccommodation>(
  {
    compositId: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    screenshot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Accommodation =
  mongoose.models.Accommodation ||
  mongoose.model<IAccommodation>("Accommodation", accommodationSchema);

export default Accommodation;
