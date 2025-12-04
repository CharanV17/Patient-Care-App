import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import MedicineItem from '../components/MedicineItem';
import { FaPlus, FaTimes } from 'react-icons/fa';

const Medicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        active: true,
    });

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const { data } = await api.get('/medicines');
            setMedicines(data);
        } catch (error) {
            console.error('Error fetching medicines', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/medicines/${editingId}`, formData);
            } else {
                await api.post('/medicines', formData);
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({ name: '', dosage: '', frequency: '', duration: '', active: true });
            fetchMedicines();
        } catch (error) {
            console.error('Error saving medicine', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this medicine?')) {
            try {
                await api.delete(`/medicines/${id}`);
                fetchMedicines();
            } catch (error) {
                console.error('Error deleting medicine', error);
            }
        }
    };

    const handleEdit = (medicine: any) => {
        setEditingId(medicine._id);
        setFormData({
            name: medicine.name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            duration: medicine.duration,
            active: medicine.active,
        });
        setShowModal(true);
    };

    const openModal = () => {
        setEditingId(null);
        setFormData({ name: '', dosage: '', frequency: '', duration: '', active: true });
        setShowModal(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Medicines</h2>
                <button
                    onClick={openModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
                >
                    <FaPlus className="mr-2" /> Add Medicine
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicines.map((medicine: any) => (
                    <MedicineItem
                        key={medicine._id}
                        medicine={medicine}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                        <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Medicine' : 'Add New Medicine'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage (e.g., 500mg)</label>
                                <input
                                    type="text"
                                    name="dosage"
                                    value={formData.dosage}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency (e.g., Twice a day)</label>
                                <input
                                    type="text"
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (e.g., 5 days)</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6 flex items-center">
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">Currently Taking</label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                Save Medicine
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Medicines;
