import { useLocation, useNavigate } from "react-router-dom";
import happyEmoji from '../assets/emoji.PNG';
import sadEmoji from '../assets/sad.PNG';
import neutralEmoji from '../assets/neutral.PNG';
import Sidebar from "../components/Sidebar";

const moodConfig = {
    Happy: { emoji: happyEmoji, color: "#4318FF", bg: "#E9E6FF", label: "Happy" },
    Calm: { emoji: happyEmoji, color: "#4318FF", bg: "#E9E6FF", label: "Calm" },
    Neutral: { emoji: neutralEmoji, color: "#A3AED0", bg: "#F4F7FE", label: "Neutral" },
    Sad: { emoji: sadEmoji, color: "#868CFF", bg: "#EEF0FF", label: "Sad" },
};

const ShowInfo = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { title, content, date, mood, tags, journalId, media } = state || {};
    const moodInfo = moodConfig[mood] || moodConfig["Neutral"];

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/* Print styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

                @media print {
                    .no-print { display: none !important; }
                    .print-area {
                        margin: 0 !important;
                        padding: 40px !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                    body { background: white !important; }
                    .sidebar-wrapper { display: none !important; }
                    .main-wrapper { margin-left: 0 !important; }
                }

                * { font-family: 'DM Sans', sans-serif; }
                .playfair { font-family: 'Playfair Display', serif; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .fade-up { animation: fadeUp 0.5s ease forwards; }
                .fade-up-2 { animation: fadeUp 0.5s 0.1s ease both; }
                .fade-up-3 { animation: fadeUp 0.5s 0.2s ease both; }
                .fade-up-4 { animation: fadeUp 0.5s 0.3s ease both; }
                .fade-in { animation: fadeIn 0.4s ease forwards; }
            `}</style>

            <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="sidebar-wrapper no-print">
                    <Sidebar activePage="journals" />
                </div>

                <div className="main-wrapper md:ml-[290px] flex-1 p-4 md:p-10 flex flex-col items-start">

                    <div className="mb-6 no-print">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 bg-white hover:bg-[#F4F7FE] text-[#2B3674] px-4 py-2 rounded-xl shadow-sm transition-all text-sm font-bold group border border-[#E6EDFF]"
                        >
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    </div>

                    {/* Journal Card */}
                    <div className="print-area w-full relative bg-white rounded-3xl shadow-xl shadow-[#4318FF]/8 overflow-hidden">

                        {/* Header strip */}
                        <div
                            className="fade-up px-8 pt-8 pb-6 relative overflow-hidden"
                            style={{ background: "linear-gradient(135deg, #4318FF 0%, #868CFF 100%)" }}
                        >
                            {/* Decorative circles */}
                            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
                                style={{ background: "white" }} />
                            <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full opacity-10"
                                style={{ background: "white" }} />

                            <div className="relative z-10">
                                <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-2">
                                    Journal Entry
                                </p>
                                <h1 className="text-3xl font-bold text-white leading-snug mb-4">
                                    {title || "Untitled"}
                                </h1>

                                <div className="flex items-center justify-between flex-wrap gap-3">
                                    <p className="text-white/70 text-sm">{date}</p>

                                    {/* Mood badge */}
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                                        <img src={moodInfo.emoji} alt={mood} className="w-4 h-4 object-contain" />
                                        <span className="text-white text-sm font-medium">{mood || "—"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider with notevia brand */}
                        <div className="fade-up-2 flex items-center gap-3 px-8 py-4 border-b border-[#F4F7FE]">
                            <div className="w-2 h-2 rounded-full bg-[#4318FF]" />
                            <span className="text-xs text-[#A3AED0] tracking-widest uppercase font-medium">Notevia</span>
                            <div className="flex-1 h-px bg-[#F4F7FE]" />
                        </div>


                        {/* Media / Images */}
                        {media && media.length > 0 && media[0].url ? (
                            <img src={media[0].url} alt="journal" />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        {/* Content */}
                        <div className="fade-up-3 px-8 py-6">
                            <p className="text-[#1B2559] leading-[1.9] text-[15px] whitespace-pre-wrap">
                                {content || "No content available."}
                            </p>
                        </div>

                        {/* Tags */}
                        {tags && tags.length > 0 && (
                            <div className="fade-up-4 px-8 pb-6 flex flex-wrap gap-2">
                                {tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-[#E9E6FF] text-[#4318FF] px-3 py-1.5 rounded-full font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="fade-up-4 mx-8 mb-8 mt-2 p-4 rounded-2xl flex items-center gap-3"
                            style={{ background: "#F4F7FE" }}>
                            <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: moodInfo.bg }}
                            >
                                <img src={moodInfo.emoji} alt={mood} className="w-5 h-5 object-contain" />
                            </div>
                            <div>
                                <p className="text-xs text-[#A3AED0] font-medium">Mood recorded</p>
                                <p className="text-sm font-semibold" style={{ color: moodInfo.color }}>
                                    {mood || "—"}
                                </p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-xs text-[#A3AED0] font-medium">Date</p>
                                <p className="text-sm font-semibold text-[#1B2559]">{date || "—"}</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default ShowInfo;