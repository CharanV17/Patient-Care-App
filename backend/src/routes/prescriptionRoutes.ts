import express from 'express';
import { getPrescriptions, createPrescription, getPrescriptionById } from '../controllers/prescriptionController';
import { protect } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

router.route('/')
    .get(protect, getPrescriptions)
    .post(protect, upload.single('image'), createPrescription);

router.route('/:id')
    .get(protect, getPrescriptionById);

export default router;
