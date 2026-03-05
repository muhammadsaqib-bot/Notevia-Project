import dashboard1 from "../assets/dashboardIcon.png";
import search from '../rch Icon.png';
import calendar from '../assets/calendar.png';
import tabler from '../assets/tabler.png';
import graph from '../assets/Graph.png';
import chart from '../assets/Chart.png';
import emoji from '../assets/emoji.png';
import sad from '../assets/sad.png';
import neutral from '../assets/neutral.png';
import plus from '../assets/plus.png';
import del from '../assets/delete.png';
import write from '../assets/write.png';
import eye from '../assets/eye.png';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "../components/Card";
import Toaster from "../components/Toaster";
import { API_BASE_URL } from "../API";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { name, profilePic, isVerifying } = useAuth();
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
    const [searchResults, setSearchResults] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [totalJournals, setTotalJournals] = useState(0);
    const [thisWeekCount, setThisWeekCount] = useState(0);
    const [writingStreak, setWritingStreak] = useState(0);
    const navigate = useNavigate();
    const debounceTimer = useRef(null);

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (!value.trim()) {
            setSearchResults(null);
            setSearchLoading(false);
            return;
        }

        setSearchLoading(true);

        debounceTimer.current = setTimeout(async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await axios.get(`${API_BASE_URL}journals`, {
                    params: { search: value },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSearchResults(res.data.data || []);
            } catch (err) {
                showToast("Search failed. Try again.");
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        }, 2000);
    };

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
    }, [navigate]);

    const handleDelete = (deletedId) => {
        setJournals(prev => prev.filter(j => (j.id || j._id) !== deletedId));
        setTotalJournals(prev => prev - 1);
    };

    const handleEdit = (journal) => {
        try {
            const numericDate = journal.journal_date ? new Date(journal.journal_date).toISOString().split('T')[0] : "";
            navigate('/AddJournal', {
                state: {
                    journalId: journal.id || journal._id,
                    title: journal.title,
                    content: journal.content,
                    date: numericDate,
                    mood: journal.mood,
                    heading: "Update Journal"
                }
            });
        } catch (error) {
            console.log("Error : ", error);
        }
    };

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
            <Sidebar activePage="dashboard" />
            <div className="md:ml-72.5 flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi {name},</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">
                            Welcome to Notevia!
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4 lg:mt-0 w-full lg:w-auto">
                        {/* Search Box with Dropdown */}
                        <div className="bg-white px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm w-full sm:w-auto">
                            <img src={search} alt="" className="w-4 h-4 object-contain cursor-pointer" />
                            <input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="outline-none text-sm w-full sm:w-60 h-9"
                            />
                            {searchLoading && (
                                <div className="w-4 h-4 border-2 border-[#4318FF] border-t-transparent rounded-full animate-spin shrink-0"></div>
                            )}
                        </div>

                        <img
                            src={profilePic || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-[#E6EDFF]"
                        />
                    </div>
                </div>

                {/* Stats Card - Fixed Equal Width */}
                <div className="flex flex-wrap justify-start gap-4 mb-6 md:mb-8">
                    <div className="p-4 md:p-5 rounded-2xl flex items-center justify-between shadow-sm bg-white w-73.5">
                        <div className="flex gap-3 items-center">
                            <div className="shrink-0 rounded-2xl w-11 h-11 flex justify-center items-center bg-linear-to-r from-[#868CFF] to-[#4318FF]">
                                <img src={dashboard1} alt="" className="w-5 h-5 object-contain" />
                            </div>
                            <div>
                                <p className="text-xs text-[#A3AED0]">Total Journals</p>
                                <h3 className="text-xl font-bold text-[#1B2559]">{totalJournals}</h3>
                            </div>
                        </div>
                        <img src={graph} alt="" className="w-16 h-8 object-contain opacity-60" />
                    </div>
                    <div className="p-4 md:p-5 rounded-2xl flex items-center justify-between shadow-sm bg-white w-73.75">
                        <div className="flex gap-3 items-center">
                            <div className="shrink-0 rounded-2xl w-11 h-11 flex justify-center items-center bg-linear-to-r from-[#868CFF] to-[#4318FF]">
                                <img src={calendar} alt="" className="w-5 h-5 object-contain" />
                            </div>
                            <div>
                                <p className="text-xs text-[#A3AED0]">This Week</p>
                                <h3 className="text-xl font-bold text-[#1B2559]">{thisWeekCount.toString().padStart(2, '0')}</h3>
                            </div>
                        </div>
                        <img src={graph} alt="" className="w-16 h-8 object-contain opacity-60" />
                    </div>
                    <div className="p-4 md:p-5 rounded-2xl flex items-center justify-between shadow-sm bg-white w-73.75">
                        <div className="flex gap-3 items-center">
                            <div className="shrink-0 rounded-2xl w-11 h-11 flex justify-center items-center bg-[#EFF4FB]">
                                <img src={tabler} alt="" className="w-5 h-5 object-contain" />
                            </div>
                            <div>
                                <p className="text-xs text-[#A3AED0]">Writing Streak</p>
                                <h3 className="text-xl font-bold text-[#1B2559]">{writingStreak} Days</h3>
                            </div>
                        </div>
                        <img src={graph} alt="" className="w-16 h-8 object-contain opacity-60" />
                    </div>
                    <div className="p-4 md:p-5 rounded-2xl flex items-center justify-between shadow-sm bg-linear-to-r from-[#4318FF] to-[#6A53FF] text-white relative overflow-hidden w-73.75">
                        <div>
                            <p className="text-xs opacity-80 text-white">Mood This Week</p>
                            <h3 className="text-xl font-bold text-white">
                                {moodStats.length > 0
                                    ? `Mostly ${[...moodStats].sort((a, b) => parseInt(b.percent) - parseInt(a.percent))[0].name}`
                                    : "N/A"}
                            </h3>
                        </div>
                        <img src={chart} alt="" className="absolute right-0 top-[30%] w-22.5 h-12.5 object-contain" />
                    </div>
                </div>
                {/* Stats Card End */}

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
                    <Link to='/AddJournal' className="bg-[#4318FF] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2">
                        <img src={plus} alt="" />
                        <span>Add Journal</span>
                    </Link>
                    <Link to='/Journals' className="bg-[#E9E6FF] text-[#4318FF] px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm font-semibold w-full sm:w-auto text-center">
                        View All Journals
                    </Link>
                </div>
                <div className="flex flex-col min-[1500px]:flex-row gap-4 lg:gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-lg font-semibold text-[#2B3674]">
                                {searchResults !== null ? `Search Results` : "Recent Journals"}
                            </h2>
                            {searchResults !== null && !searchLoading && (
                                <span className="text-xs bg-[#E9E6FF] text-[#4318FF] px-2 py-1 rounded-full font-medium">
                                    {searchResults.length} found
                                </span>
                            )}
                        </div>

                        {/* Journal loading (initial page load) */}
                        {journalsLoading ? (
                            <div className="flex justify-center py-10">
                                <div className="w-8 h-8 border-4 border-[#4318FF] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : searchLoading ? (
                            // Search in progress - show shimmer/spinner
                            <div className="flex flex-col items-center justify-center py-16 gap-3">
                                <div className="w-10 h-10 border-4 border-[#4318FF] border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-sm text-[#A3AED0]">Searching journals...</p>
                            </div>
                        ) : searchResults !== null ? (
                            // Search done - show results
                            searchResults.length === 0 ? (
                                <div className="bg-white p-6 rounded-2xl text-center text-[#A3AED0]">
                                    <p>No journals found for "<span className="font-medium text-[#4318FF]">{searchQuery}</span>"</p>
                                </div>
                            ) : (
                                searchResults.map((journal) => (
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
                                        onUpdate={() => handleEdit(journal)}
                                        media={journal.media}
                                    />
                                ))
                            )
                        ) : (
                            // Normal journals (no search)
                            journals.length === 0 ? (
                                <div className="bg-white p-6 rounded-2xl text-center text-[#A3AED0]">
                                    <p>No journals found.</p>
                                </div>
                            ) : (
                                journals.map((journal) => (
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
                                        onUpdate={() => handleEdit(journal)}
                                        media={journal.media}
                                    />
                                ))
                            )
                        )}
                    </div>
                    <div className="w-full min-[1500px]:w-80">
                        <h3 className="text-lg font-semibold text-[#2B3674] mb-4">Mood Summary</h3>
                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
                            {moodStats.map((item, i) => (
                                <div key={i} className="mb-4 flex items-center">
                                    <img src={item.name === "Sad" ? sad : item.name === "Neutral" ? neutral : emoji} alt="" className="w-6 h-6 object-contain mr-2 mt-2" />
                                    <div className="w-full ">
                                        <span className="text-sm font-medium text-[#2B3674] mr-2">{item.name}</span>
                                        <span>{item.percent}</span>
                                        <div className="w-full h-2 bg-[#F4F7FE] rounded-full overflow-hidden mt-1">
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