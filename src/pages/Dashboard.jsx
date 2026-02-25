import noteviaLogo from "../assets/Neografica.PNG";
import dashboard1 from "../assets/dashboardIcon.PNG";
import journalIcon from "../assets/JournalIcon.PNG";
import penIcon from "../assets/penIcon.PNG";
import profileIcon from "../assets/profileIcon.PNG";
import settingsIcon from "../assets/settingIcon.PNG";
import search from '../assets/Search Icon.PNG';
import user from '../assets/user.PNG';
import calendar from '../assets/calendar.PNG';
import tabler from '../assets/tabler.PNG';
import graph from '../assets/Graph.PNG';
import chart from '../assets/Chart.PNG';
import emoji from '../assets/emoji.PNG';
import plus from '../assets/plus.PNG';
import del from '../assets/delete.PNG';
import write from '../assets/write.PNG';
import eye from '../assets/eye.PNG';
import { useLocation, useNavigate, } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">

            {/* Sidebar */}
            <div className={`w-full md:w-[290px] md:h-screen md:fixed top-0 left-0 bg-white px-[20px] shadow-sm shrink-0 z-50 transition-all duration-300 ${isMenuOpen ? 'h-auto pb-5' : 'h-[80px] overflow-hidden md:h-screen'}`}>
                <div className='flex gap-5 mt-6 md:mt-[55px] mb-5 items-center justify-between md:justify-center w-full h-[45px] rounded-[5px] md:border-b border-[#E6EDFF] md:pb-10'>
                    <div className="flex items-center gap-2">
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

                <div className='rounded cursor-pointer h-[45px] w-90% bg-[#4318FF] flex pl-10 mb-5'>
                    <div className='flex items-center gap-3 '>
                        <img className='h-[16px] w-[16px]' src={dashboard1} alt="" />
                        <p className='text-[#FFF] font-[500] text-[16px] leading-[28px]'>Dashboard</p>
                    </div>
                </div>

                <div className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-10 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px] w-[17px]' src={journalIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Journals</p>
                    </div>
                </div>

                <div className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-10 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={penIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Add journal</p>
                    </div>
                </div>

                <div className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-10 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={profileIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Profile</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:ml-[290px] flex-1 p-4 md:p-8 overflow-y-auto">

                {/* Top Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi Saqib,</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">
                            Welcome to Notevia!
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4 lg:mt-0 w-full lg:w-auto">
                        <div className="bg-white px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm w-full sm:w-auto">
                            <img src={search} alt="" className="w-4 h-4 object-contain" />
                            <input placeholder="Search" className="outline-none text-sm w-full sm:w-[240px] h-[36px]" />
                        </div>
                        <img src={user} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 mb-6 md:mb-8">
                    {[{
                        title: 'Total Journals',
                        value: '128',
                        icon: dashboard1,
                        bg: 'from-[#868CFF] to-[#4318FF]',
                        graph: graph,
                    }, {
                        title: 'This Week',
                        value: '05',
                        icon: calendar,
                        bg: 'from-[#868CFF] to-[#4318FF]',
                        graph: graph,
                    }, {
                        title: 'Writing Streak',
                        value: '7 Days',
                        icon: tabler,
                        bg: 'bg-[#F4F7FE]',
                        graph: graph,
                    }, {
                        title: 'Mood This Week',
                        value: 'Mostly Calm',
                        icon: chart,
                        bg: 'from-[#4318FF] to-[#6A53FF]',
                        graph: null,
                        textWhite: true
                    }].map((card, i) => (
                        <div
                            key={i}
                            className={`w-full min-[850px]:flex-1 min-w-[180px] p-4 md:p-6 rounded-2xl flex items-center justify-between shadow-sm 
                                ${card.textWhite ? `bg-gradient-to-r ${card.bg} text-white` : 'bg-white'}`}
                        >
                            <div className="flex gap-3 md:gap-5 items-center">
                                <div className={`shrink-0 rounded-4xl w-10 md:w-12 h-10 md:h-12 flex justify-center items-center ${card.bg.startsWith('bg') ? card.bg : `bg-gradient-to-r ${card.bg}`}`}>
                                    <img src={card.icon} alt="" className="w-4 md:w-6 h-4 md:h-6 object-contain" />
                                </div>
                                <div>
                                    <p className={`text-sm ${card.textWhite ? 'opacity-80 text-white' : 'text-[#A3AED0]'}`}>{card.title}</p>
                                    <h3 className={`text-lg md:text-xl font-bold ${card.textWhite ? 'text-white' : 'text-[#1B2559]'}`}>{card.value}</h3>
                                </div>
                            </div>
                            {card.graph && <img src={card.graph} alt="" className="hidden min-[850px]:block" />}
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
                    <button className="bg-[#4318FF] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2">
                        <img src={plus} alt="" /> New Journal
                    </button>
                    <button className="bg-[#E9E6FF] text-[#4318FF] px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm font-semibold w-full sm:w-auto">
                        View All Journals
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">

                    {/* Recent Journals */}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-[#2B3674] mb-4">Recent Journals</h2>
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="bg-white p-4 md:p-6 rounded-2xl mb-4 shadow-sm">
                                <div className="flex justify-between mb-2 flex-wrap gap-2">
                                    <div>
                                        <h3 className="font-semibold text-[#2B3674]">A Productive Day</h3>
                                        <p className="text-xs text-[#A3AED0] font-[500]">12 Feb 2026</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#F4F7FE] px-2 py-1 rounded-full text-sm">
                                        <img src={emoji} alt="" className="w-4 h-4 object-contain" />
                                        Calm
                                    </div>
                                </div>

                                <p className="text-sm text-[#A3AED0] mb-2">
                                    "Today I finally completed the dashboard design..."
                                </p>
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <div className="flex gap-2 text-xs text-[#A3AED0] flex-wrap">
                                        <span className="bg-[#F4F7FE] px-2 py-1 rounded-full">Work</span>
                                        <span className="bg-[#F4F7FE] px-2 py-1 rounded-full">Design</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <img src={eye} alt="" className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded" />
                                        <img src={write} alt="" className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded" />
                                        <img src={del} alt="" className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mood Summary */}
                    <div className="w-full lg:w-80">
                        <h3 className="text-lg font-semibold text-[#2B3674] mb-4">Mood Summary</h3>
                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
                            {[
                                { name: "Happy", percent: "40%" },
                                { name: "Calm", percent: "35%" },
                                { name: "Neutral", percent: "15%" },
                                { name: "Sad", percent: "10%" }
                            ].map((item, i) => (
                                <div key={i} className="mb-4 flex items-center">
                                    <img src={emoji} alt="" className="w-6 h-6 object-contain mr-2 mt-2" />
                                    <div className="w-full ">
                                        <span>{item.name}</span>
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