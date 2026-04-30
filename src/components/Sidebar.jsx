import { useState } from "react";
import { Link } from "react-router-dom";
import noteviaLogo from "../assets/neografica.png";
import dashboard1 from "../assets/dashboardIcon.png";
import journalIcon from "../assets/journalIcon.png";
import penIcon from "../assets/penIcon.png";
import profileIcon from "../assets/profileIcon.png";
import settingIcon from "../assets/settingIcon.png";

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
        {
            label: "Settings",
            to: "/Setting",
            icon: settingIcon,
            iconClass: "h-[20px]",
            key: "setting",
        },
    ];

    return (
        <div
            className={`w-full md:w-72.5 md:h-screen md:fixed top-0 left-0 bg-white px-5 shadow-sm shrink-0 z-50 transition-all duration-300 
            ${isMenuOpen ? "h-auto pb-5" : "h-20 overflow-hidden md:h-screen md:overflow-visible"}`}
        >
            <div className="flex gap-5 mt-6 md:mt-13.75 mb-5 items-center justify-between md:justify-center w-full h-11.25 rounded-[5px] md:border-b border-[#E6EDFF] md:pb-10">
                <div className="flex items-center gap-4 pr-8.75">
                    <Link to="/Notevia" className="cursor-pointer">
                        <img src={noteviaLogo} alt="Notevia Logo" />
                    </Link>
                    <h2 className="font-extrabold text-[26px] leading-[120%] text-center text-[#1B2559]">
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
                        className={`rounded cursor-pointer h-11.25 w-full flex pl-7 mb-5 items-center
                            ${isActive ? "bg-[#4318FF]" : "hover:bg-[#F4F7FE]"}`}
                    >
                        <div className="flex items-center gap-3">
                            <img className={item.iconClass} src={item.icon} alt={item.label} />
                            <p className={`font-medium text-[16px] leading-7 ${isActive ? "text-white" : "text-[#A3AED0]"}`}>
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