import React from 'react';
import { format } from 'date-fns';
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa';

interface AppointmentProps {
    appointment: {
        _id: string;
        doctor: string;
        date: string;
        location: string;
        notes?: string;
    };
    onDelete: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentProps> = ({ appointment, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 relative">
            <button onClick={() => onDelete(appointment._id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                <FaTrash />
            </button>
            <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                    <span className="font-bold text-xl">{format(new Date(appointment.date), 'dd')}</span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Dr. {appointment.doctor}</h3>
                    <p className="text-sm text-gray-500">{format(new Date(appointment.date), 'MMMM yyyy, h:mm a')}</p>
                </div>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-2">
                <FaMapMarkerAlt className="mr-2" />
                {appointment.location}
            </div>
            {appointment.notes && <p className="text-sm text-gray-500 mt-2 italic">"{appointment.notes}"</p>}
        </div>
    );
};

export default AppointmentCard;
