import { useState } from "react";
import { Link } from "react-router-dom";
import noteviaLogo from "../assets/Neografica.PNG";
import dashboard1 from "../assets/dashboardIcon.PNG";
import journalIcon from "../assets/JournalIcon.PNG";
import penIcon from "../assets/penIcon.PNG";
import profileIcon from "../assets/profileIcon.PNG";

const Sidebar = ({ activePage = "" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        {
            label: "Dashboard",
            to: "/Dashboard1",
            icon: dashboard1,
            iconClass: "h-[16px] w-[16px]",
            key: "dashboard",
        },
        {
            label: "Journals",
            to: "/Journals",
            icon: journalIcon,
            iconClass: "h-[20px] w-[17px]",
            key: "journals",
        },
        {
            label: "Add journal",
            to: "/AddJournal",
            icon: penIcon,
            iconClass: "h-[20px]",
            key: "addjournal",
        },
        {
            label: "Profile",
            to: "/Profile",
            icon: profileIcon,
            iconClass: "h-[20px]",
            key: "profile",
        },
    ];

    return (
        <div
            className={`w-full md:w-[290px] md:h-screen md:fixed top-0 left-0 bg-white px-[20px] shadow-sm shrink-0 z-50 transition-all duration-300 
            ${isMenuOpen ? "h-auto pb-5" : "h-[80px] overflow-hidden md:h-screen md:overflow-visible"}`}
        >
            <div className="flex gap-5 mt-6 md:mt-[55px] mb-5 items-center justify-between md:justify-center w-full h-[45px] rounded-[5px] md:border-b border-[#E6EDFF] md:pb-10">
                <div className="flex items-center gap-4 pr-[35px]">
                    <Link to="/Notevia" className="cursor-pointer">
                        <img src={noteviaLogo} alt="Notevia Logo" />
                    </Link>
                    <h2 className="font-[800] text-[26px] leading-[120%] text-center text-[#1B2559]">
                        NOTEVIA
                    </h2>
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-[#1B2559]"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {navItems.map((item) => {
                const isActive = activePage === item.key;

                return (
                    <Link
                        key={item.key}
                        to={item.to}
                        className={`rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5 items-center
                            ${isActive ? "bg-[#4318FF]" : "hover:bg-[#F4F7FE]"}`}
                    >
                        <div className="flex items-center gap-3">
                            <img className={item.iconClass} src={item.icon} alt={item.label} />
                            <p className={`font-[500] text-[16px] leading-[28px] ${isActive ? "text-white" : "text-[#A3AED0]"}`}>
                                {item.label}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Sidebar;
