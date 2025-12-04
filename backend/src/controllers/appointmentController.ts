import { Response } from 'express';
import Appointment from '../models/Appointment';
import { AuthRequest } from '../middleware/authMiddleware';

export const getAppointments = async (req: AuthRequest, res: Response) => {
    try {
        const appointments = await Appointment.find({ userId: req.user._id });
        res.json(appointments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createAppointment = async (req: AuthRequest, res: Response) => {
    const { doctor, date, location, notes } = req.body;

    try {
        const appointment = new Appointment({
            userId: req.user._id,
            doctor,
            date,
            location,
            notes,
        });

        const createdAppointment = await appointment.save();
        res.status(201).json(createdAppointment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAppointment = async (req: AuthRequest, res: Response) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (appointment) {
            if (appointment.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await appointment.deleteOne();
            res.json({ message: 'Appointment removed' });
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
