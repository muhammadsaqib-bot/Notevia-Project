import noteviaLogo from "../assets/Neografica.PNG";
import dashboard1 from "../assets/dashboardIcon.PNG";
import journalIcon from "../assets/JournalIcon.PNG";
import penIcon from "../assets/penIcon.PNG";
import profileIcon from "../assets/profileIcon.PNG";
import settingsIcon from "../assets/settingIcon.PNG";
import search from '../assets/Search Icon.PNG';
import user from '../assets/user.PNG';
import emoji from '../assets/emoji.PNG';
import del from '../assets/delete.PNG';
import write from '../assets/write.PNG';
import eye from '../assets/eye.PNG';
import calendarIcon from "../assets/calendar.PNG";

import { useState } from "react";

const Dashboard = () => {
    const [date, setDate] = useState("");

    function handleDate(e) {
        setDate(e.target.value);
    }

    return (
        <div className="w-screen min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">

            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white p-4 md:p-6 flex flex-col justify-between shadow-sm">
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-6 md:mb-10">
                        <img src={noteviaLogo} alt="Logo" className="w-8 h-8 object-contain" />
                        <h2 className="text-xl font-bold text-[#1B2559]">NOTEVIA</h2>
                    </div>

                    {/* Menu */}
                    <div className="flex flex-col gap-2 md:gap-4 text-[#A3AED0] text-sm">
                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#F4F7FE] rounded cursor-pointer">
                            <img src={dashboard1} alt="dashboard" className="w-5 h-5 object-contain bg-gray-200" />
                            Dashboard
                        </div>

                        <div className="flex items-center gap-3 bg-gradient-to-r from-[#4318FF] to-[#6A53FF] text-white px-4 py-3 rounded cursor-pointer">
                            <img src={journalIcon} alt="journals" className="w-5 h-5 object-contain" />
                            Journals
                        </div>

                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#F4F7FE] rounded cursor-pointer">
                            <img src={penIcon} alt="add journal" className="w-5 h-5 object-contain" />
                            Add Journal
                        </div>

                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#F4F7FE] rounded cursor-pointer">
                            <img src={profileIcon} alt="profile" className="w-5 h-5 object-contain" />
                            Profile
                        </div>

                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#F4F7FE] rounded cursor-pointer">
                            <img src={settingsIcon} alt="settings" className="w-5 h-5 object-contain" />
                            Settings
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">

                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi Zeeshan,</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">Welcome to Notevia!</h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
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

                        {/* Select Option */}
                        <div className="w-full sm:w-[114px] p-[2px] text-[#8F9BBA] text-[14px] font-[400] bg-white shadow-sm rounded-[10px]">
                            <select className="bg-white flex items-center gap-2 h-[46px] w-full">
                                <option value="">Option 1</option>
                                <option value="">Option 2</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm w-full sm:w-[240px]">
                            <img src={search} alt="" className="w-4 h-4 object-contain" />
                            <input
                                placeholder="Search"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm">
                            <div className="flex justify-between mb-2">
                                <div>
                                    <h3 className="font-semibold text-[#2B3674]">
                                        {item === 1 ? "A Productive Day" : "Creative Flow"}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#A3AED0] font-[500]">
                                        {item === 1 ? "12 Feb 2026" : "13 Feb 2026"}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 bg-[#F4F7FE] px-3 py-1 rounded-full text-sm">
                                    <img src={emoji} alt="" className="w-4 h-4 object-contain" />
                                    {item === 1 ? "Calm" : "Happy"}
                                </div>
                            </div>

                            <p className="text-sm text-[#A3AED0] mb-4">
                                {item === 1
                                    ? '"Today I finally completed the dashboard design..."'
                                    : '"Worked on improving the user experience..."'}
                            </p>

                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 text-xs sm:text-sm text-[#A3AED0]">
                                    <span className="bg-[#F4F7FE] px-3 py-1 rounded-full">
                                        {item === 1 ? "Work" : "UI"}
                                    </span>
                                    <span className="bg-[#F4F7FE] px-3 py-1 rounded-full">
                                        {item === 1 ? "Design" : "Ideas"}
                                    </span>
                                </div>

                                <div className="flex gap-2 sm:gap-3">
                                    <img
                                        src={eye}
                                        alt=""
                                        className="bg-[#F4F7FE] w-[36px] h-[36px] p-[6px] rounded cursor-pointer"
                                    />
                                    <img
                                        src={write}
                                        alt=""
                                        className="bg-[#F4F7FE] w-[36px] h-[36px] p-[6px] rounded cursor-pointer"
                                    />
                                    <img
                                        src={del}
                                        alt=""
                                        className="bg-[#F4F7FE] w-[36px] h-[36px] p-[6px] rounded cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;