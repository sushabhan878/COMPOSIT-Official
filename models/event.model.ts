import mongoose from "mongoose";

interface IEvent {
    _id?: mongoose.Types.ObjectId;
}

const eventSchema = new mongoose.Schema<IEvent>({
    
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;