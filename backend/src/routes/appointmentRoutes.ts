import express from 'express';
import { getAppointments, createAppointment, deleteAppointment } from '../controllers/appointmentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(protect, getAppointments)
    .post(protect, createAppointment);

router.route('/:id')
    .delete(protect, deleteAppointment);

export default router;
