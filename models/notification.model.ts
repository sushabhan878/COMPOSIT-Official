import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["user", "sa", "event"],
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },
    subject: {
      type: String,
      required: true,
    },
    bodyMarkdown: {
      type: String,
      required: true,
    },
    recipientsCount: {
      type: Number,
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

export default Notification;
