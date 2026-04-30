import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../API';
import Sidebar from '../components/Sidebar';
import Toaster from '../components/Toaster';
import useAuth from '../hooks/useAuth';

const Setting = () => {
    const { name, profilePic, isVerifying } = useAuth();
    const navigate = useNavigate();
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [showLockModal, setShowLockModal] = useState(false);
    const [lockTimeout, setLockTimeout] = useState("off");

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    useEffect(() => {
        const initLock = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/SignIn");
                return;
            }

            try {
                const lockRes = await axios.get(`${API_BASE_URL}lock/preferences`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (lockRes.data?.preferences) {
                    setLockTimeout(lockRes.data.preferences);
                }
            } catch (err) {
                if (err.response?.status === 401 || err.response?.status === 423) {
                    navigate("/ConfirmPin");
                    return;
                }
            }
        };

        if (!isVerifying) {
            initLock();
        }
    }, [navigate, isVerifying]);

    const handleSetLock = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.put(`${API_BASE_URL}lock/preferences`, {
                "preferences": lockTimeout
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showToast("Lock preferences updated!");
            setShowLockModal(false);
        } catch (err) {
            showToast(err.response?.data?.message || "Failed to set lock preferences.");
        }
    };

    if (isVerifying) {
        return (
            <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
                <Sidebar activePage="setting" />
                <div className="md:ml-72.5 flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="animate-pulse bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
            {toastOpen && (
                <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />
            )}

            <Sidebar activePage="setting" />

            <div className="md:ml-72.5 flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi {name.split(' ')[0] || 'User'},</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B3674]">Settings</h1>
                    </div>
                    <div className="bg-white p-1 rounded-full">
                        <img
                            src={profilePic || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="border p-1 w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                </div>

                <div
                    className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 overflow-hidden transition-all duration-300 ease-out"
                    style={{ maxHeight: showLockModal ? 780 : "auto" }}
                >
                    {showLockModal ? (
                        <div className="space-y-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#2B3674] mb-2">Lock Timeout</h3>
                                    <p className="text-sm text-[#A3AED0]">Select how long the app should wait before it locks automatically.</p>
                                </div>
                                <button
                                    onClick={() => setShowLockModal(false)}
                                    className="px-4 py-2 rounded-full border border-[#E6EDFF] text-[#2B3674] bg-[#F4F7FE] hover:bg-[#EEF2FF] transition-colors"
                                >
                                    Back
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 mb-8">
                                {[
                                    { label: "off", value: "off" },
                                    { label: "1 min", value: "1 min" },
                                    { label: "5 min", value: "5 min" },
                                    { label: "10 min", value: "10 min" },
                                    { label: "30 min", value: "30 min" }
                                ].map((option) => (
                                    <label key={option.value} className="flex items-center justify-between p-4 bg-[#F4F7FE] rounded-2xl cursor-pointer hover:bg-[#EEF2FF] transition-colors border border-[#E6EDFF]">
                                        <span className="text-sm font-medium text-[#1B2559]">{option.label}</span>
                                        <input
                                            type="radio"
                                            name="lockTimeout"
                                            value={option.value}
                                            checked={lockTimeout === option.value}
                                            onChange={(e) => setLockTimeout(e.target.value)}
                                            className="w-5 h-5 accent-[#4318FF] cursor-pointer"
                                        />
                                    </label>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowLockModal(false)}
                                    className="flex-1 h-12 rounded-full border border-[#E6EDFF] text-[#A3AED0] font-semibold hover:bg-[#F4F7FE] transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSetLock}
                                    className="flex-1 h-12 rounded-full bg-[#4318FF] text-white font-semibold shadow-lg shadow-[#4318ff33] hover:bg-[#3311DD] transition-all cursor-pointer"
                                >
                                    Set Lock
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-[#2B3674] mb-6">Security Settings</h3>
                            <div className="flex items-center justify-between p-4 bg-[#F4F7FE] rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-[#2B3674]">Auto Lock</p>
                                    <p className="text-xs text-[#A3AED0]">Automatically lock the app after inactivity</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setShowLockModal(true)}
                                        className="w-18 px-4 py-2 bg-[#4318FF] text-white text-sm font-medium rounded-full hover:bg-[#3311DD] transition-colors"
                                    >
                                        {lockTimeout}
                                    </button>
                                </div>
                            </div>
                            <h2 className='text-xs text-[#A3AED0] text-center '>New features will be added after some time.</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Setting;
