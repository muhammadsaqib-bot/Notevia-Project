import noteviaLogo from "../assets/Neografica.PNG";
import dashboard1 from "../assets/dashboardIcon.PNG";
import journalIcon from "../assets/JournalIcon.PNG";
import penIcon from "../assets/penIcon.PNG";
import profileIcon from "../assets/profileIcon.PNG";
import calendarIcon from "../assets/calendar.PNG";
import emji from '../assets/emoji.PNG';
import sad from '../assets/sad.PNG';
import neutral from '../assets/neutral.PNG';

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";

const AddJournal = () => {
    const API_BASE_URL = 'https://new-my-journals.vercel.app/';
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMood, setSelectedMood] = useState("Calm");
    const [title, setTitle] = useState("");

    const [date, setDate] = useState("");
    const [entry, setEntry] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/SignIn");
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}profiles/me`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setName(response.data.full_name || response.data.name || response.data.user?.name || "Guest");
                setProfilePic(response.data.profile_picture || null);
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate("/ConfirmPin");
                    return;
                }
                showToast(err.response?.data?.message || "Session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/SignIn");
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleCancel = () => {
        navigate("/Dashboard1");
    };

    const handleSave = async () => {
        if (!title.trim()) {
            setError("Title is required.");
            return;
        }
        if (!entry.trim()) {
            setError("Journal entry is required.");
            return;
        }
        if (!date) {
            setError("Date is required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem('token');

            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", entry.trim());
            formData.append("journal_date", date);
            formData.append("mood", selectedMood);
            if (selectedFile) {
                formData.append("files", selectedFile);
            }

            const response = await axios.post(`${API_BASE_URL}journals`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });

            showToast("Journal saved successfully!");
            setTimeout(() => {
                navigate("/Journals");
            }, 1500);

        } catch (err) {
            if (err.response?.status === 401) {
                showToast("Session expired. Please login again.");
                setTimeout(() => {
                    localStorage.removeItem("token");
                    navigate("/SignIn");
                }, 1500);
                return;
            }
            const msg = err.response?.data?.message || "Failed to save journal. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
            {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}

            <div className={`w-full md:w-[290px] md:h-screen md:fixed top-0 left-0 bg-white px-[20px] shadow-sm z-50 transition-all ${isMenuOpen ? 'h-auto pb-5' : 'h-[80px] md:h-screen'}`}>
                <div className='flex gap-5 mt-6 md:mt-[55px] mb-5 items-center justify-between md:justify-center w-full h-[45px] rounded-[5px] md:border-b border-[#E6EDFF] md:pb-10'>
                    <div className="flex items-center gap-4 pr-[35px]">
                        <img src={noteviaLogo} alt="" />
                        <h2 className='font-[800] text-[26px] leading-[120%] text-center text-[#1B2559]'>NOTEVIA</h2>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-[#1B2559]"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                <Link to='/Dashboard1' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[16px] w-[16px]' src={dashboard1} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Dashboard</p>
                    </div>
                </Link>

                <Link to='/Journals' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px] w-[17px]' src={journalIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Journals</p>
                    </div>
                </Link>

                <div className='bg-[#4318FF] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={penIcon} alt="" />
                        <p className='text-[#FFF] font-[500] text-[16px] leading-[28px]'>Add journal</p>
                    </div>
                </div>

                <Link to='/Profile' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={profileIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Profile</p>
                    </div>
                </Link>
            </div>

            <div className="md:ml-[290px] flex-1 p-4 md:p-8 overflow-y-auto">

                <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi {name},</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">Welcome to Notevia!</h1>
                    </div>
                    <div className="bg-white p-1 rounded">
                        <img
                            src={profilePic || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="border border-[gray] p-1 w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                    <h2 className="text-lg font-semibold text-[#2B3674] mb-6">New Journal</h2>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col min-[768px]:flex-row gap-6 mb-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-[#2B3674] mb-2">Title</label>
                            <input
                                type="text"
                                placeholder="My Thoughts Today"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] placeholder:text-[#A3AED0] outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-[#2B3674] mb-2">How are you feeling?</label>
                            <div className="flex flex-wrap gap-2">
                                {["Happy", "Calm", "Neutral", "Sad"].map((mood) => (
                                    <button
                                        key={mood}
                                        onClick={() => setSelectedMood(mood)}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer
                                            ${selectedMood === mood
                                                ? "bg-[#4318FF] text-white border-[#4318FF]"
                                                : "bg-[#F4F7FE] text-[#A3AED0] border-[#E6EDFF] hover:border-[#4318FF]"
                                            }`}
                                    >
                                        <img
                                            src={mood === "Sad" ? sad : mood === "Neutral" ? neutral : emji}
                                            alt=""
                                            className="w-4 h-4"
                                        />
                                        {mood}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col min-[768px]:flex-row gap-6 mb-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-[#2B3674] mb-2">Date</label>
                            <div className="relative">
                                <img
                                    src={calendarIcon}
                                    alt="calendar"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                                />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 pr-10 text-sm text-[#2B3674] placeholder:text-[#A3AED0] outline-none focus:border-[#4318FF] transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#2B3674] mb-2">Attach File <span className="text-[#A3AED0] font-normal">(optional)</span></label>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="w-full bg-[#F4F7FE] border border-dashed border-[#4318FF] rounded-xl px-4 py-4 text-sm text-[#A3AED0] cursor-pointer hover:bg-[#EEF2FF] transition-colors flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#4318FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656L5.757 10.757a6 6 0 008.486 8.486L19 14.5" />
                            </svg>
                            {selectedFile ? selectedFile.name : "Click to select a file"}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-[#2B3674] mb-2">Journal Entry</label>
                        <textarea
                            placeholder="Journal Entry"
                            value={entry}
                            onChange={(e) => setEntry(e.target.value)}
                            rows={8}
                            className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] placeholder:text-[#A3AED0] outline-none focus:border-[#4318FF] transition-colors resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-3 rounded-full border border-[#E6EDFF] text-[#A3AED0] text-sm font-medium hover:bg-[#F4F7FE] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-6 py-3 rounded-full bg-[#4318FF] text-white text-sm font-semibold hover:bg-[#3311DD] transition-colors cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Journal"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddJournal;
