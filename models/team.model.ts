import mongoose from "mongoose";

interface ITeam {
    _id?: mongoose.Types.ObjectId;
}

const teamSchema = new mongoose.Schema<ITeam>({
    
}, { timestamps: true });

const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", teamSchema);

export default Team;