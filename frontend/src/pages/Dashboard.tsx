import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { FaPills, FaCalendarAlt, FaFilePrescription } from 'react-icons/fa';
import { format } from 'date-fns';

const Dashboard = () => {
    const auth = useContext(AuthContext);
    const [stats, setStats] = useState({
        medicines: 0,
        appointments: 0,
        prescriptions: 0,
    });
    const [nextAppointment, setNextAppointment] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [medsRes, apptsRes, prescRes] = await Promise.all([
                    api.get('/medicines'),
                    api.get('/appointments'),
                    api.get('/prescriptions'),
                ]);

                const activeMeds = medsRes.data.filter((m: any) => m.active).length;
                const upcomingAppts = apptsRes.data.filter((a: any) => new Date(a.date) > new Date());

                setStats({
                    medicines: activeMeds,
                    appointments: upcomingAppts.length,
                    prescriptions: prescRes.data.length,
                });

                if (upcomingAppts.length > 0) {
                    const sorted = upcomingAppts.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
                    setNextAppointment(sorted[0]);
                }
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome back, {auth?.user?.name}!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-blue-100 p-4 rounded-full text-blue-600 mr-4">
                        <FaPills size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Active Medicines</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.medicines}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-green-100 p-4 rounded-full text-green-600 mr-4">
                        <FaCalendarAlt size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Upcoming Appointments</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.appointments}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-purple-100 p-4 rounded-full text-purple-600 mr-4">
                        <FaFilePrescription size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Prescriptions</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.prescriptions}</p>
                    </div>
                </div>
            </div>

            {nextAppointment && (
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Next Appointment</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100">Dr. {nextAppointment.doctor}</p>
                            <p className="text-lg font-semibold mt-1">{format(new Date(nextAppointment.date), 'PPPP p')}</p>
                            <p className="text-sm text-blue-200 mt-1">{nextAppointment.location}</p>
                        </div>
                        <FaCalendarAlt size={48} className="text-blue-400 opacity-50" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
