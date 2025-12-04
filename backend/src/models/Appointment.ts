import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
    userId: mongoose.Types.ObjectId;
    doctor: string;
    date: Date;
    location: string;
    notes?: string;
}

const AppointmentSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    notes: { type: String },
}, { timestamps: true });

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
