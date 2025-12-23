import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    image?: string;
    gender: "male" | "female" | "other";
    role: "user" | "admin" | "sa";
    collegeName: string;
    collegeId: string;
    department: string;
    yearOfStudy: string;
    city: string;
    state: string;
    saId: string;    // The id by which the user was referred
    referredBy: string;
    password: string,
    team?: mongoose.Types.ObjectId; // Reference to Team model
    registeredEvents: mongoose.Types.ObjectId[]; // Array of references to Event model
    cirtificateGenerated: boolean;
    cirtificates: {
        cirtificateLink: string;
    }[];
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
    },
    image: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "sa"],
        required: false,
        default: "user",
    },
    collegeName: {
        type: String,
        required: false,
    },
    collegeId: {
        type: String,
        required: false,
        unique: true,
    },
    department: {
        type: String,
        required: false,
    },
    yearOfStudy: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    saId: {
        type: String,
        required: false,
    },
    referredBy: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: false,
    },
    registeredEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: false,
        }
    ],
    cirtificateGenerated: {
        type: Boolean,
        required: false,
        default: false,
    },
    cirtificates: [
        {
            cirtificateLink: {
                type: String,
                unique: true,
            },
        }
    ]
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;