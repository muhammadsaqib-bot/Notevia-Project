import noteviaLogo from "../assets/Neografica.PNG";
import dashboard1 from "../assets/dashboardIcon.PNG";
import journalIcon from "../assets/JournalIcon.PNG";
import penIcon from "../assets/penIcon.PNG";
import profileIcon from "../assets/profileIcon.PNG";
import search from '../assets/Search Icon.PNG';
import user from '../assets/user.PNG';
import emoji from '../assets/emoji.PNG';
import del from '../assets/delete.PNG';
import write from '../assets/write.PNG';
import eye from '../assets/eye.PNG';
import calendarIcon from "../assets/calendar.PNG";
import axios from "axios";
import Toaster from "../components/Toaster";
import Card from "../components/Card";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Journals = () => {
    const API_BASE_URL = 'https://new-my-journals.vercel.app/';
    const [date, setDate] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [name, setName] = useState("");
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [journals, setJournals] = useState([]);
    const [journalsLoading, setJournalsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    function handleDate(e) {
        setDate(e.target.value);
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get(`${API_BASE_URL}profiles/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setName(response.data.full_name || "Guest");
            } catch (err) {
                if (err.response?.status === 401) {
                    showToast("Please verify your PIN");
                    setTimeout(() => navigate("/ConfirmPin"), 1500);
                    return;
                }
                const msg = err.response?.data?.message || "Session expired. Please login again.";
                showToast(msg);
                setTimeout(() => {
                    localStorage.removeItem("token");
                    navigate("/SignIn");
                }, 1500);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchJournals = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            setJournalsLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}journals`, {
                    params: { page: 1, limit: 100 },
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Get : ', response);

                const list = response.data.data || [];
                setJournals(Array.isArray(list) ? list : []);
            } catch (err) {
                if (err.response?.status === 401) {
                    showToast("Session expired. Please login again.");
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        navigate("/SignIn");
                    }, 1500);
                    return;
                }
                showToast("Failed to load journals.");
            } finally {
                setJournalsLoading(false);
            }
        };

        fetchJournals();
    }, []);

    // Filter journals by search query and selected date
    const filteredJournals = journals.filter((j) => {
        const matchesSearch = searchQuery
            ? j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.content?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        const matchesDate = date
            ? j.journal_date?.startsWith(date)
            : true;

        return matchesSearch && matchesDate;
    });

    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
            {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}

            {/* Sidebar */}
            <div className={`w-full md:w-[290px] md:h-screen md:fixed top-0 left-0 bg-white px-[20px] shadow-sm shrink-0 z-50 transition-all duration-300 ${isMenuOpen ? 'h-auto pb-5' : 'h-[80px] overflow-hidden md:h-screen'}`}>
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

                <div className='bg-[#4318FF] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px] w-[17px]' src={journalIcon} alt="" />
                        <p className='text-[#FFF] font-[500] text-[16px] leading-[28px]'>Journals</p>
                    </div>
                </div>

                <Link to='/AddJournal' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={penIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Add journal</p>
                    </div>
                </Link>

                <Link to='/Profile' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={profileIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Profile</p>
                    </div>
                </Link>
            </div>

            {/* Main Content */}
            <div className="md:ml-[290px] flex-1 p-4 md:p-8 overflow-y-auto">

                {/* Top Bar */}
                <div className="flex flex-col min-[970px]:flex-row justify-between items-start min-[970px]:items-center mb-6 sm:mb-8 gap-4">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi {name || 'User'},</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">Welcome to Notevia!</h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full min-[970px]:w-auto">
                        {/* Date Picker */}
                        <div className="relative w-full sm:w-[140px]">
                            <img
                                src={calendarIcon}
                                alt="calendar"
                                className="bg-gray-200 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                            />
                            <input
                                type={date ? "date" : "text"}
                                value={date}
                                placeholder="Select Date"
                                onFocus={(e) => (e.target.type = "date")}
                                onChange={handleDate}
                                onBlur={(e) => !date && (e.target.type = "text")}
                                className="bg-white pl-5 pr-3 py-3 w-full rounded-xl shadow-sm outline-none text-sm"
                            />
                        </div>

                        {/* Search */}
                        <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm w-full sm:w-[240px]">
                            <img src={search} alt="" className="w-4 h-4 object-contain" />
                            <input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none text-sm w-full h-[36px]"
                            />
                        </div>

                        {/* Profile */}
                        <img
                            src={user}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Recent Journals */}
                <h2 className="text-lg font-semibold text-[#2B3674] mb-4 sm:mb-6">
                    Recent Journals
                </h2>

                {journalsLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-4 border-[#4318FF] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredJournals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#A3AED0]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm">No journals found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {filteredJournals.map((journal) => (
                            <Card
                                key={journal.id}
                                title={journal.title}
                                date={journal.journal_date ? new Date(journal.journal_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ""}
                                mood={journal.mood}
                                content={journal.content}
                                tags={journal.tags}
                                emoji={emoji}
                                eye={eye}
                                write={write}
                                del={del}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Journals;