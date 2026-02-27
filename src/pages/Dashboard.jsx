import noteviaLogo from "../assets/Neografica.PNG";
import dashboard1 from "../assets/dashboardIcon.PNG";
import journalIcon from "../assets/JournalIcon.PNG";
import penIcon from "../assets/penIcon.PNG";
import profileIcon from "../assets/profileIcon.PNG";
import search from '../assets/Search Icon.PNG';
import calendar from '../assets/calendar.PNG';
import tabler from '../assets/tabler.PNG';
import graph from '../assets/Graph.PNG';
import chart from '../assets/Chart.PNG';
import emoji from '../assets/emoji.PNG';
import sad from '../assets/sad.PNG';
import neutral from '../assets/neutral.PNG';
import plus from '../assets/plus.PNG';
import del from '../assets/delete.PNG';
import write from '../assets/write.PNG';
import eye from '../assets/eye.PNG';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Toaster from "../components/Toaster";

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const API_BASE_URL = 'https://new-my-journals.vercel.app/';
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [journals, setJournals] = useState([]);
    const [journalsLoading, setJournalsLoading] = useState(true);
    const [moodStats, setMoodStats] = useState([
        { name: "Happy", percent: "0%" },
        { name: "Calm", percent: "0%" },
        { name: "Neutral", percent: "0%" },
        { name: "Sad", percent: "0%" }
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalJournals, setTotalJournals] = useState(0);
    const [thisWeekCount, setThisWeekCount] = useState(0);
    const [writingStreak, setWritingStreak] = useState(0);
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(true);

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
                        Authorization: `Bearer ${token}`
                    }
                });

                setName(response.data.full_name || "Guest");
                setProfilePic(response.data.profile_picture || null);
                setIsVerifying(false);
            } catch (err) {
                const status = err.response?.status;
                if (status === 401) navigate("/ConfirmPin");
                else {
                    localStorage.removeItem("token");
                    navigate("/SignIn");
                }
            }
        };
        fetchProfile();
    }, [navigate]);

    useEffect(() => {
        const fetchJournals = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            setJournalsLoading(true);
            try {
                const statsResponse = await axios.get(`${API_BASE_URL}Dashboard`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const stats = statsResponse.data;
                setTotalJournals(stats.totalJournals || 0);
                setThisWeekCount(stats.thisWeekCount || 0);
                setWritingStreak(stats.writingStreak || 0);

                const journalsResponse = await axios.get(`${API_BASE_URL}journals`, {
                    params: { page: 1, limit: 100 },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setJournals(journalsResponse.data.data || []);

                const moodResponse = await axios.get(`${API_BASE_URL}mood/mood-summary`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const moodData = moodResponse.data || {};
                setMoodStats(Object.entries(moodData).map(([mood, percent]) => ({
                    name: mood,
                    percent
                })));
            } catch (err) {
                if (err.response?.status === 401) {
                    showToast("Session expired. Please login again.");
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        navigate("/SignIn");
                    }, 1500);
                    return;
                }
                showToast(err.response?.data?.message || "Failed to load journals.");
            } finally {
                setJournalsLoading(false);
            }
        };
        fetchJournals();
    }, []);

    const handleDelete = (deletedId) => {
        setJournals(prev => prev.filter(j => (j.id || j._id) !== deletedId));
        setTotalJournals(prev => prev - 1);
    };

    const filteredJournals = journals.filter(j => {
        const query = searchQuery.toLowerCase();
        return j.title?.toLowerCase().includes(query) || j.content?.toLowerCase().includes(query);
    });

    if (isVerifying) {
        return (
            <div className="max-w-full min-h-screen bg-[#F4F7FE] flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-[#4318FF] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
            {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}
            <div className={`w-full md:w-[290px] md:h-screen md:fixed top-0 left-0 bg-white px-[20px] shadow-sm shrink-0 z-50 transition-all duration-300 ${isMenuOpen ? 'h-auto pb-5' : 'h-[80px] overflow-hidden md:h-screen'}`}>
                <div className='flex gap-5 mt-6 md:mt-[55px] mb-5 items-center justify-between md:justify-center w-full h-[45px] rounded-[5px] md:border-b border-[#E6EDFF] md:pb-10'>
                    <div className="flex items-center gap-4 pr-[35px]">
                        <Link to='/Notevia' className="cursor-pointer">
                            <img src={noteviaLogo} alt="" /></Link>
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

                <div className='bg-[#4318FF] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3 '>
                        <img className='h-[16px] w-[16px]' src={dashboard1} alt="" />
                        <p className='text-[#FFF] font-[500] text-[16px] leading-[28px]'>Dashboard</p>
                    </div>
                </div>

                <Link to='/Journals' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px] w-[17px]' src={journalIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Journals</p>
                    </div>
                </Link>

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
            <div className="md:ml-[290px] flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi {name},</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">
                            Welcome to Notevia!
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4 lg:mt-0 w-full lg:w-auto">
                        <div className="bg-white px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm w-full sm:w-auto">
                            <img src={search} alt="" className="w-4 h-4 object-contain cursor-pointer" />
                            <input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none text-sm w-full sm:w-[240px] h-[36px]"
                            />
                        </div>
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-[#E6EDFF]"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="p-4 md:p-6 rounded-2xl flex items-center justify-between shadow-sm bg-white">
                        <div className="flex gap-3 md:gap-5 items-center">
                            <div className="shrink-0 rounded-4xl w-10 md:w-12 h-10 md:h-12 flex justify-center items-center bg-gradient-to-r from-[#868CFF] to-[#4318FF]">
                                <img src={dashboard1} alt="" className="w-4 md:w-6 h-4 md:h-6 object-contain" />
                            </div>
                            <div>
                                <p className="text-sm text-[#A3AED0]">Total Journals</p>
                                <h3 className="text-lg md:text-xl font-bold text-[#1B2559]">{totalJournals}</h3>
                            </div>
                        </div>
                        <img src={graph} alt="" className="hidden xl:block" />
                    </div>
                    <div className="p-4 md:p-6 rounded-2xl flex items-center justify-between shadow-sm bg-white">
                        <div className="flex gap-3 md:gap-5 items-center">
                            <div className="shrink-0 rounded-4xl w-10 md:w-12 h-10 md:h-12 flex justify-center items-center bg-gradient-to-r from-[#868CFF] to-[#4318FF]">
                                <img src={calendar} alt="" className="w-4 md:w-6 h-4 md:h-6 object-contain" />
                            </div>
                            <div>
                                <p className="text-sm text-[#A3AED0]">This Week</p>
                                <h3 className="text-lg md:text-xl font-bold text-[#1B2559]">{thisWeekCount.toString().padStart(2, '0')}</h3>
                            </div>
                        </div>
                        <img src={graph} alt="" className="hidden xl:block" />
                    </div>
                    <div className="p-4 md:p-6 rounded-2xl flex items-center justify-between shadow-sm bg-white">
                        <div className="flex gap-3 md:gap-5 items-center">
                            <div className="shrink-0 rounded-4xl w-10 md:w-12 h-10 md:h-12 flex justify-center items-center bg-[#F4F7FE]">
                                <img src={tabler} alt="" className="w-4 md:w-6 h-4 md:h-6 object-contain" />
                            </div>
                            <div>
                                <p className="text-sm text-[#A3AED0]">Writing Streak</p>
                                <h3 className="text-lg md:text-xl font-bold text-[#1B2559]">{writingStreak} Days</h3>
                            </div>
                        </div>
                        <img src={graph} alt="" className="hidden xl:block" />
                    </div>
                    <div className="p-4 md:p-6 rounded-2xl flex items-center justify-between shadow-sm bg-gradient-to-r from-[#4318FF] to-[#6A53FF] text-white relative overflow-hidden">
                        <div className="flex gap-3 md:gap-5 items-center">
                            <div>
                                <p className="text-sm opacity-80 text-white">Mood This Week</p>
                                <h3 className="text-lg md:text-xl font-bold text-white">
                                    {moodStats.length > 0
                                        ? `Mostly ${[...moodStats].sort((a, b) => parseInt(b.percent) - parseInt(a.percent))[0].name}`
                                        : "N/A"}
                                </h3>
                            </div>
                            <img src={chart} alt="" className="absolute right-0 top-[30%] w-[90px] h-[50px] object-contain" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
                    <Link to='/AddJournal' className="bg-[#4318FF] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2">
                        <img src={plus} alt="" />
                        <span>Add Journal</span>
                    </Link>
                    <Link to='/Journals' className="bg-[#E9E6FF] text-[#4318FF] px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm font-semibold w-full sm:w-auto text-center">
                        View All Journals
                    </Link>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-[#2B3674] mb-4">Recent Journals</h2>
                        {journalsLoading ? (
                            <div className="flex justify-center py-10">
                                <div className="w-8 h-8 border-4 border-[#4318FF] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : filteredJournals.length === 0 ? (
                            <div className="bg-white p-6 rounded-2xl text-center text-[#A3AED0]">
                                <p>No journals found.</p>
                            </div>
                        ) : (
                            filteredJournals.map((journal) => (
                                <Card
                                    key={journal.id || journal._id}
                                    id={journal.id || journal._id}
                                    title={journal.title}
                                    date={journal.journal_date ? new Date(journal.journal_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ""}
                                    mood={journal.mood}
                                    content={journal.content}
                                    tags={journal.tags}
                                    emoji={emoji}
                                    eye={eye}
                                    write={write}
                                    del={del}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                    <div className="w-full lg:w-80">
                        <h3 className="text-lg font-semibold text-[#2B3674] mb-4">Mood Summary</h3>
                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
                            {moodStats.map((item, i) => (
                                <div key={i} className="mb-4 flex items-center">
                                    <img src={item.name === "Sad" ? sad : item.name === "Neutral" ? neutral : emoji} alt="" className="w-6 h-6 object-contain mr-2 mt-2" />
                                    <div className="w-full ">
                                        <span className="text-sm font-medium text-[#2B3674] mr-2">{item.name}</span>
                                        <span>{item.percent}</span>
                                        <div className="w-[100%] h-2 bg-[#F4F7FE] rounded-full overflow-hidden mt-1">
                                            <div className="h-full bg-[#4318FF]" style={{ width: item.percent }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;