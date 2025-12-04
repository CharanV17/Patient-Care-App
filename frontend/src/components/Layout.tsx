import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaPills, FaFilePrescription, FaCalendarAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';

const Layout = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth?.logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">Patient Care</h1>
                </div>
                <nav className="mt-6">
                    <Link to="/dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <FaHome className="mr-3" /> Dashboard
                    </Link>
                    <Link to="/prescriptions" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <FaFilePrescription className="mr-3" /> Prescriptions
                    </Link>
                    <Link to="/medicines" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <FaPills className="mr-3" /> Medicines
                    </Link>
                    <Link to="/appointments" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <FaCalendarAlt className="mr-3" /> Appointments
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 mt-auto">
                        <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
