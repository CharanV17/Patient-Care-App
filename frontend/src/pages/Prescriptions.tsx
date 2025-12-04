import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PrescriptionCard from '../components/PrescriptionCard';
import { FaPlus, FaTimes } from 'react-icons/fa';

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        doctor: '',
        issuedDate: '',
        notes: '',
        medicines: '',
    });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            const { data } = await api.get('/prescriptions');
            setPrescriptions(data);
        } catch (error) {
            console.error('Error fetching prescriptions', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('doctor', formData.doctor);
        data.append('issuedDate', formData.issuedDate);
        data.append('notes', formData.notes);
        data.append('medicines', JSON.stringify(formData.medicines.split(',').map(m => m.trim())));
        if (image) {
            data.append('image', image);
        }

        try {
            await api.post('/prescriptions', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setShowModal(false);
            setFormData({ doctor: '', issuedDate: '', notes: '', medicines: '' });
            setImage(null);
            fetchPrescriptions();
        } catch (error) {
            console.error('Error adding prescription', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Prescriptions</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
                >
                    <FaPlus className="mr-2" /> Add Prescription
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prescriptions.map((prescription: any) => (
                    <PrescriptionCard key={prescription._id} prescription={prescription} />
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                        <h3 className="text-xl font-bold mb-4">Add New Prescription</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                                <input
                                    type="text"
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Issued Date</label>
                                <input
                                    type="date"
                                    name="issuedDate"
                                    value={formData.issuedDate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medicines (comma separated)</label>
                                <input
                                    type="text"
                                    name="medicines"
                                    value={formData.medicines}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Paracetamol, Amoxicillin"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image/PDF</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    accept="image/*,.pdf"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                Save Prescription
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Prescriptions;
