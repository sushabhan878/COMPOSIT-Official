import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Auto-delete after 300 seconds (5 mins)
  isVerified: { type: Boolean, default: false },
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", otpSchema);

export default Otp;
