import { Response } from 'express';
import Prescription from '../models/Prescription';
import { AuthRequest } from '../middleware/authMiddleware';

export const getPrescriptions = async (req: AuthRequest, res: Response) => {
    try {
        const prescriptions = await Prescription.find({ userId: req.user._id });
        res.json(prescriptions);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createPrescription = async (req: AuthRequest, res: Response) => {
    const { doctor, issuedDate, notes, medicines } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const prescription = new Prescription({
            userId: req.user._id,
            doctor,
            issuedDate,
            notes,
            imageUrl,
            medicines: medicines ? JSON.parse(medicines) : [],
        });

        const createdPrescription = await prescription.save();
        res.status(201).json(createdPrescription);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrescriptionById = async (req: AuthRequest, res: Response) => {
    try {
        const prescription = await Prescription.findById(req.params.id);

        if (prescription) {
            res.json(prescription);
        } else {
            res.status(404).json({ message: 'Prescription not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePrescription = async (req: AuthRequest, res: Response) => {
    try {
        const prescription = await Prescription.findById(req.params.id);

        if (prescription) {
            if (prescription.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await prescription.deleteOne();
            res.json({ message: 'Prescription removed' });
        } else {
            res.status(404).json({ message: 'Prescription not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
