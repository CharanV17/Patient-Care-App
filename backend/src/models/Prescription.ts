import mongoose, { Schema, Document } from 'mongoose';

export interface IPrescription extends Document {
    userId: mongoose.Types.ObjectId;
    doctor: string;
    issuedDate: Date;
    notes?: string;
    imageUrl?: string;
    medicines: string[];
}

const PrescriptionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: String, required: true },
    issuedDate: { type: Date, required: true },
    notes: { type: String },
    imageUrl: { type: String },
    medicines: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IPrescription>('Prescription', PrescriptionSchema);
