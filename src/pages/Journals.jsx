import search from '../assets/Search Icon.PNG';
import emoji from '../assets/emoji.PNG';
import del from '../assets/delete.PNG';
import write from '../assets/write.PNG';
import eye from '../assets/eye.PNG';
import axios from "axios";
import Toaster from "../components/Toaster";
import Card from "../components/Card";
import { API_BASE_URL } from "../API";
import useAuth from "../hooks/useAuth";
import Sidebar from '../components/Sidebar';


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Journals = () => {
    const { name, profilePic, isVerifying } = useAuth();
    const [date, setDate] = useState("");
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [selectedMood, setSelectedMood] = useState("All Mood");
    const [journals, setJournals] = useState([]);
    const [journalsLoading, setJournalsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
    };

    const handleDelete = (deletedId) => {
        setJournals(prev => prev.filter(j => (j.id || j._id) !== deletedId));
        showToast("Journal deleted successfully");
        setTimeout(() => setToastOpen(false), 2000);
    };

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
                console.log(response);

                const list = response.data.data || [];
                setJournals(list);
            } catch (err) {
                if (err.response?.status === 401) {
                    // Sirf 401 pe logout karo
                    showToast("Session expired. Please login again.");
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        navigate("/SignIn");
                    }, 1500);
                    return;
                }
                // Baaki errors pe sirf message dikhao, logout mat karo
                showToast("Failed to load data. Please refresh.");
            } finally {
                setJournalsLoading(false);
            }
        };

        fetchJournals();
    }, [navigate]);

    const filteredJournals = journals.filter((j) => {
        const matchesSearch = searchQuery
            ? j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.content?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        const matchesDate = date ? j.journal_date?.startsWith(date) : true;
        const matchesMood = selectedMood !== "All Mood" ? j.mood === selectedMood : true;
        return matchesSearch && matchesDate && matchesMood;
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
            <Sidebar activePage="journals" />

            <div className="md:ml-[290px] flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex flex-col min-[970px]:flex-row justify-between items-start min-[970px]:items-center mb-6 sm:mb-8 gap-4">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi {name || 'User'},</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">Welcome to Notevia!</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full min-[970px]:w-auto">
                        <div className="relative w-full sm:w-[140px]">
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-white pl-5 pr-3 py-3 w-full rounded-xl shadow-sm outline-none text-sm"
                            />
                        </div>

                        <select
                            value={selectedMood}
                            onChange={(e) => setSelectedMood(e.target.value)}
                            className="bg-white pl-5 w-full sm:w-[130px] text-gray-500 py-3 rounded-xl shadow-sm outline-none text-sm cursor-pointer"
                        >
                            <option value="All Mood">All Mood</option>
                            <option value="Happy">Happy</option>
                            <option value="Calm">Calm</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Sad">Sad</option>
                        </select>

                        <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm w-full sm:w-[240px]">
                            <img src={search} alt="" className="w-4 h-4 object-contain" />
                            <input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none text-sm w-full h-[36px]"
                            />
                        </div>
                        <img
                            src={profilePic || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-[#E6EDFF]"
                        />
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-[#2B3674] mb-4">
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Journals;