import noteviaLogo from "../assets/Neografica.PNG";
import dashboard1 from "../assets/dashboardIcon.PNG";
import journalIcon from "../assets/JournalIcon.PNG";
import penIcon from "../assets/penIcon.PNG";
import profileIcon from "../assets/profileIcon.PNG";
import user from '../assets/user.PNG';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";

const Profile = () => {
    const API_BASE_URL = 'https://new-my-journals.vercel.app/';
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate("/SignIn");

            try {
                const response = await axios.get(`${API_BASE_URL}profiles/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFullName(response.data.full_name || "");
                setEmail(response.data.email || "");
                setBio(response.data.bio || "");
            } catch (err) {
                if (err.response?.status === 401) {
                    showToast(err.response?.data?.message || "Please verify your PIN");
                    setTimeout(() => {
                        navigate("/ConfirmPin");
                    }, 1500);
                    return;
                }
                const msg = err.response?.data?.message || "Something went wrong.";
                showToast(msg);
                setTimeout(() => {
                }, 1500);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleSave = () => {
        console.log({ fullName, email, bio });
        // Handle save logic here
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        showToast("Logged out successfully");
        setTimeout(() => navigate("/SignIn"), 1000);
    };

    const handleChangePassword = () => {
        console.log("Change Password clicked");
        // Handle change password logic here
    };

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

                    {/* Hamburger Icon for Mobile */}
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

                <Link to='/AddJournal' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={penIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Add journal</p>
                    </div>
                </Link>

                <div className='bg-[#4318FF] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={profileIcon} alt="" />
                        <p className='text-[#FFF] font-[500] text-[16px] leading-[28px]'>Profile</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:ml-[290px] flex-1 p-4 md:p-8 overflow-y-auto">

                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi {fullName.split(' ')[0] || 'User'},</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B3674]">Welcome to Notevia!</h1>
                    </div>
                    <div className="bg-white p-1 rounded">
                        <img
                            src={user}
                            alt="Profile"
                            className="border border-[gray] p-1 w-12 h-12 rounded-full object-cover"
                        /></div>
                </div>

                {/* Profile Form Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">

                    {/* Back Header */}
                    <div className="flex items-center gap-2 mb-6">
                        <Link to="/Dashboard1" className="text-[#2B3674] hover:text-[#4318FF] transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <h2 className="text-lg font-semibold text-[#2B3674]">New Journal</h2>
                    </div>

                    {/* Avatar & Name */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#EBE9FB] flex items-center justify-center shrink-0">
                            <svg className="w-7 h-7 text-[#4318FF]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-[#1B2559] font-semibold text-lg">{fullName || "User"}</h3>
                            <p className="text-[#A3AED0] text-sm">Joined Jan 2026</p>
                        </div>
                    </div>

                    {/* Full Name + Email */}
                    <div className="flex flex-col min-[768px]:flex-row gap-6 mb-6">
                        <div className="flex-1">
                            <label className="pl-[5px] block text-sm font-medium text-[#2B3674] mb-2 pl-[5px]">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="pl-[5px] block text-sm font-medium text-[#2B3674] mb-2 pl-[5px]">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-8">
                        <label className="pl-[5px] block text-sm font-medium text-[#2B3674] mb-2">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={5}
                            className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 flex-wrap">
                        <button
                            onClick={handleLogout}
                            className="w-[174px] h-[50px]  rounded-full border border-red-300 bg-[#F5E1E7] text-[16px] font-[500] hover:bg-red-50 transition-colors cursor-pointer text-[#FF1818]"
                        >
                            Logout
                        </button>
                        <button
                            onClick={handleChangePassword}
                            className="w-[213px] h-[50px]  rounded-full border border-[#E6EDFF] text-[#4318FF] text-sm font-[500] hover:bg-[#F4F7FE] transition-colors cursor-pointer bg-[#4318FF1A]"
                        >
                            Change Password
                        </button>
                        <button
                            onClick={handleSave}
                            className="w-[174px]  rounded-full bg-[#4318FF] text-white text-sm font-[500] hover:bg-[#3311DD] transition-colors cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
