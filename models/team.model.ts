import mongoose from "mongoose";

interface ITeam {
    _id?: mongoose.Types.ObjectId;
    teamName: string;
    leader: mongoose.Types.ObjectId; // Reference to User model
    isLeader: boolean;
    members: {
        name: string;
        email: string;
        comirmTeam: boolean;
        status: "pending" | "accepted" | "rejected";
    }  // Array of references to User model
    events: mongoose.Types.ObjectId[]; // Array of references to Event model
    
}

const teamSchema = new mongoose.Schema<ITeam>({
    teamName: {
        type: String,
        required: true,
        unique: true,
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isLeader: {
        type: Boolean,
        required: true,
        default: false,
    },
    members: [
        {
            name: {
                type: String,
                requiered: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            comirmTeam: {
                type: Boolean,
                required: true,
                default: false,
            },
            status: {
                type: String,
                enum: ["pending", "accepted", "rejected"],
                required: true,
                default: "pending",
            }
        }
    ],
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        }
    ],
}, { timestamps: true });

const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", teamSchema);

export default Team;