import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from './Loading';
import { FaTrash, FaTimes } from 'react-icons/fa'; // Import icons
import { MdEdit, MdOutlineDone } from 'react-icons/md';

export default function Profile({ closePopup }) {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState({ name: false, email: false });
    const [formData, setFormData] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    const userId = localStorage.getItem("id");
    console.log("MongoDB ID of the logged in user : ", userId);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${api}/users/get-user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.data);
                    setFormData({ name: data.data.name, email: data.data.email });
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (field) => {
        try {
            const response = await fetch(`${api}/users/update-user/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ [field]: formData[field] }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser({ ...user, [field]: data.data[field] });
                setEditMode({ ...editMode, [field]: false });
                alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${api}/users/delete-user/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                alert('Account deleted successfully!');
                localStorage.removeItem('token');
                navigate('/');
            } else {
                const data = await response.json();
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="absolute top-16 right-44 flex items-center justify-center z-10 border-2 border-gray-300 rounded-lg"
                initial={{ scale: 0.5, opacity: 0, x: '10%', y: '-25%' }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, x: '10%', y: '-25%' }} // Matches initial animation
                transition={{ duration: 0.5 }}
                onClick={() => { closePopup(false) }}>
                <motion.div className="bg-white rounded-lg shadow-lg w-96 p-6" onClick={(e) => e.stopPropagation()}>
                    {!user ? (
                        <div className='flex justify-center items-center'>
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-bold text-indigo-700">Profile</h1>
                                <button
                                    onClick={handleDelete}
                                    className="text-red-600 hover:text-red-700"
                                    title="Delete Account"
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {/* Name Field */}
                                <div className="flex items-center justify-between">
                                    {editMode.name ? (
                                        <>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                            <button
                                                onClick={() => handleUpdate('name')}
                                                className="ml-2 text-green-600 hover:text-green-700"
                                                title="Save Name"
                                            >
                                                <MdOutlineDone size={20} />
                                            </button>
                                            <button
                                                onClick={() => setEditMode({ ...editMode, name: false })}
                                                className="ml-2 text-gray-500 hover:text-gray-700"
                                                title="Cancel"
                                            >
                                                <FaTimes size={20} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-md">
                                                <span className="font-semibold">Name:</span> {user.name}
                                            </p>
                                            <button
                                                onClick={() => setEditMode({ ...editMode, name: true })}
                                                className="text-indigo-600 hover:text-indigo-700"
                                                title="Edit Name"
                                            >
                                                <MdEdit size={20} />
                                            </button>
                                        </>
                                    )}
                                </div>
                                {/* Email Field */}
                                <div className="flex items-center justify-between">
                                    {editMode.email ? (
                                        <>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                            <button
                                                onClick={() => handleUpdate('email')}
                                                className="ml-2 text-green-600 hover:text-green-700"
                                                title="Save Email"
                                            >
                                                <MdOutlineDone size={20} />
                                            </button>
                                            <button
                                                onClick={() => setEditMode({ ...editMode, email: false })}
                                                className="ml-2 text-gray-500 hover:text-gray-700"
                                                title="Cancel"
                                            >
                                                <FaTimes size={20} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-md">
                                                <span className="font-semibold">Email:</span> {user.email}
                                            </p>
                                            <button
                                                onClick={() => setEditMode({ ...editMode, email: true })}
                                                className="text-indigo-600 hover:text-indigo-700"
                                                title="Edit Email"
                                            >
                                                <MdEdit size={20} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}