import mongoose, { Schema, Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;

  name: string;
  email: string;
  password?: string;

  mobile?: string;
  image?: string;

  gender?: "male" | "female" | "other";
  role?: "user" | "admin" | "sa";

  collegeName?: string;
  collegeId?: string;
  department?: string;
  yearOfStudy?: string;
  city?: string;
  state?: string;

  saId?: string;
  referredBy?: string;
  referralLink?: string;
  referralQrLink?: string;
  numberOfReferrals?: number;
  SARank?: number;
  joinDate?: Date;

  team?: Types.ObjectId;
  registeredEvents?: Types.ObjectId[];

  cirtificateGenerated?: boolean;
  cirtificates?: {
    cirtificateLink: string;
  }[];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: false,
    },

    mobile: {
      type: String,
      unique: true,
      sparse: true, // ✅ optional + unique
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    role: {
      type: String,
      enum: ["user", "admin", "sa"],
      default: "user",
    },

    collegeName: {
      type: String,
      trim: true,
    },

    collegeId: {
      type: String,
      unique: true,
      sparse: true, // ✅ optional + unique
      trim: true,
    },

    department: {
      type: String,
    },

    yearOfStudy: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    saId: {
      type: String,
      unique: true,
      sparse: true, // ✅ optional + unique
      trim: true,
    },

    referralLink: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    referralQrLink: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    referredBy: {
      type: String,
      trim: true,
    },

    numberOfReferrals: {
      type: Number,
      default: 0,
    },

    SARank: {
      type: Number,
      default: null,
    },

    joinDate: {
      type: Date,
      default: Date.now,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },

    registeredEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    cirtificateGenerated: {
      type: Boolean,
      default: false,
    },

    cirtificates: [
      {
        cirtificateLink: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
