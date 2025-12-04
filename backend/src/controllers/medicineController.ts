import { Response } from 'express';
import Medicine from '../models/Medicine';
import { AuthRequest } from '../middleware/authMiddleware';

export const getMedicines = async (req: AuthRequest, res: Response) => {
    try {
        const medicines = await Medicine.find({ userId: req.user._id });
        res.json(medicines);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createMedicine = async (req: AuthRequest, res: Response) => {
    const { name, dosage, frequency, duration, active } = req.body;

    try {
        const medicine = new Medicine({
            userId: req.user._id,
            name,
            dosage,
            frequency,
            duration,
            active,
        });

        const createdMedicine = await medicine.save();
        res.status(201).json(createdMedicine);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMedicine = async (req: AuthRequest, res: Response) => {
    const { name, dosage, frequency, duration, active } = req.body;

    try {
        const medicine = await Medicine.findById(req.params.id);

        if (medicine) {
            if (medicine.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            medicine.name = name || medicine.name;
            medicine.dosage = dosage || medicine.dosage;
            medicine.frequency = frequency || medicine.frequency;
            medicine.duration = duration || medicine.duration;
            medicine.active = active !== undefined ? active : medicine.active;

            const updatedMedicine = await medicine.save();
            res.json(updatedMedicine);
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMedicine = async (req: AuthRequest, res: Response) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (medicine) {
            if (medicine.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await medicine.deleteOne();
            res.json({ message: 'Medicine removed' });
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
