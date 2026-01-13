import mongoose from "mongoose";

interface ITeam {
  _id?: mongoose.Types.ObjectId;
  teamName: string;
  teamId: string;
  event: string;
  leaderId: string; // Reference to User model
  members: {
    name: string;
    compositId: string;
  }[]; // Array of references to User model
}

const teamSchema = new mongoose.Schema<ITeam>(
  {
    teamName: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
      unique: true,
    },
    leaderId: {
      type: String,
      required: true,
    },
    members: [
      {
        name: {
          type: String,
          required: true,
        },
        compositId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", teamSchema);

export default Team;
