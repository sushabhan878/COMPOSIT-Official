import mongoose from "mongoose";

interface IEvent {
    _id?: mongoose.Types.ObjectId;
    eventName: "Technova" | "Enigma" | "Excavate" | "Metaclix" | "Case Study" | "Ideathon" | "Meta Code" | "Cadvolution";
}

const eventSchema = new mongoose.Schema<IEvent>({
    eventName: {
        type: String,
        enum: ["Technova", "Enigma", "Excavate", "Metaclix", "Case Study", "Ideathon", "Meta Code", "Cadvolution"],
        required: true,
    }
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;