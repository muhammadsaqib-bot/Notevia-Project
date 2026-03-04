import React, { useState } from 'react';
import happyEmoji from '../assets/emoji.png';
import sadEmoji from '../assets/sad.png';
import neutralEmoji from '../assets/neutral.png';
import Toaster from './Toaster';
import { useNavigate, } from 'react-router-dom';
import { API_BASE_URL } from "../API";

const Card = ({ id, title, date, mood, content, tags, emoji, eye, write, del, onDelete, onUpdate, media }) => {
    const navigate = useNavigate();

    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [toaster, setToaster] = useState({ visible: false, message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: title,
        content: content,
        journalDate: date,
    });

    const moodEmojis = {
        "Happy": happyEmoji,
        "Calm": happyEmoji,
        "Neutral": neutralEmoji,
        "Sad": sadEmoji,
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        setIsSaving(true);
        const fd = new FormData();
        fd.append("title", formData.title);
        fd.append("content", formData.content);
        fd.append("journalDate", formData.journalDate);

        try {
            const res = await fetch(`${API_BASE_URL}journals/${id}`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            if (!res.ok) throw new Error("Failed");
            setToaster({ visible: true, message: "Journal updated successfully!" });
            if (onUpdate) onUpdate();
        } catch (error) {
            setToaster({ visible: true, message: "Failed to update journal." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        setIsDeleting(true);
        try {
            const res = await fetch(`${API_BASE_URL}journals/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed");
            setToaster({ visible: true, message: "Journal deleted successfully!" });
            setShowConfirm(false);
            onDelete(id);
        } catch (error) {
            setToaster({ visible: true, message: "Failed to delete journal." });
        } finally {
            setIsDeleting(false);
        }
    };

    const EditJournal = async () => {
        try {
            const numericDate = date ? new Date(date).toISOString().split('T')[0] : "";
            navigate('/AddJournal', {
                state: {
                    journalId: id,
                    title: title,
                    content: content,
                    date: numericDate,
                    mood: mood,
                    heading: "Update Journal"
                }
            });
        } catch (error) {
            setToaster({ visible: true, message: "Failed to open editor. Please try again." });
        }
    }

    const handleView = () => {
        navigate('/ShowInfo', {
            state: {
                journalId: id,
                title: title || formData.title,
                content: content || formData.content,
                date: date || formData.journalDate,
                mood: mood || "",
                tags: tags,
                media: media || [],
            }
        });
    };

    return (
        <div className="w-full relative">
            <div className="bg-white p-4 md:p-6 rounded-2xl mb-4 shadow-sm h-full">

                <div className="flex justify-between mb-2 flex-wrap gap-2">
                    <div>
                        <h3 className="font-semibold text-[#2B3674]">{title}</h3>
                        <p className="text-xs text-[#A3AED0] font-medium">{date}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#F4F7FE] px-2 py-1 rounded-full text-sm">
                        <img src={moodEmojis[mood] || emoji} alt="" className="w-4 h-4 object-contain" />
                        {mood}
                    </div>
                </div>

                <p className="text-sm text-[#A3AED0] mb-6">
                    "{content?.substring(0, 60)}..."
                </p>

                <div className="flex justify-between items-center flex-wrap gap-2 absolute right-[5%] bottom-[9%]">
                    <div className="flex gap-2 text-xs text-[#A3AED0] flex-wrap">
                        {tags?.map((tag, index) => (
                            <span key={index} className="bg-[#F4F7FE] px-2 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <img
                            src={eye}
                            alt="view"
                            className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded"
                            onClick={handleView}
                        />
                        <img
                            src={write}
                            alt="edit"
                            className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded"
                            onClick={EditJournal}
                        />
                        <img
                            src={del}
                            alt="delete"
                            className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded"
                            onClick={() => setShowConfirm(true)}
                        />
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl p-6 w-75 shadow-xl text-center">
                        <p className="text-[#2B3674] font-semibold text-base mb-1">Delete Journal?</p>
                        <p className="text-sm text-[#A3AED0] mb-5">
                            Are you sure you want to delete this journal? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setShowConfirm(false)}
                                disabled={isDeleting}
                                className="px-5 py-2 rounded-lg border text-[#A3AED0] text-sm disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm disabled:opacity-60 flex items-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Deleting...
                                    </>
                                ) : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {toaster.visible && (
                <Toaster message={toaster.message} onClose={() => setToaster({ ...toaster, visible: false })} />
            )}
        </div>
    );
};

export default Card;