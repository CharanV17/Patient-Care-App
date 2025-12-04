import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicine extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    active: boolean;
}

const MedicineSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IMedicine>('Medicine', MedicineSchema);
