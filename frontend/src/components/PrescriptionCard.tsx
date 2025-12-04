import React from 'react';
import { format } from 'date-fns';

import { FaTrash } from 'react-icons/fa';

interface PrescriptionProps {
    prescription: {
        _id: string;
        doctor: string;
        issuedDate: string;
        notes?: string;
        imageUrl?: string;
        medicines: string[];
    };
    onDelete: (id: string) => void;
}

const PrescriptionCard: React.FC<PrescriptionProps> = ({ prescription, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 relative">
            <button
                onClick={() => onDelete(prescription._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                title="Delete Prescription"
            >
                <FaTrash />
            </button>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Dr. {prescription.doctor}</h3>
                    <p className="text-sm text-gray-500">Issued: {format(new Date(prescription.issuedDate), 'PPP')}</p>
                </div>
                {prescription.imageUrl && (
                    <a href={`http://localhost:5000${prescription.imageUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mr-8">
                        View Image
                    </a>
                )}
            </div>
            {prescription.notes && <p className="mt-2 text-gray-600">{prescription.notes}</p>}
            <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Medicines:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {prescription.medicines.map((med, index) => (
                        <li key={index}>{med}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrescriptionCard;
