import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface MedicineProps {
    medicine: {
        _id: string;
        name: string;
        dosage: string;
        frequency: string;
        duration: string;
        active: boolean;
    };
    onDelete: (id: string) => void;
    onEdit: (medicine: any) => void;
}

const MedicineItem: React.FC<MedicineProps> = ({ medicine, onDelete, onEdit }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm p-4 flex justify-between items-center border-l-4 ${medicine.active ? 'border-green-500' : 'border-gray-300'}`}>
            <div>
                <h3 className="font-semibold text-gray-800">{medicine.name}</h3>
                <p className="text-sm text-gray-600">{medicine.dosage} - {medicine.frequency}</p>
                <p className="text-xs text-gray-500">Duration: {medicine.duration}</p>
            </div>
            <div className="flex space-x-2">
                <button onClick={() => onEdit(medicine)} className="text-blue-500 hover:text-blue-700 p-2">
                    <FaEdit />
                </button>
                <button onClick={() => onDelete(medicine._id)} className="text-red-500 hover:text-red-700 p-2">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default MedicineItem;
