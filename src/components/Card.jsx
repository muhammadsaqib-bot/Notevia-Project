import React, { useState } from 'react';
import happyEmoji from '../assets/emoji.PNG';
import sadEmoji from '../assets/sad.PNG';
import neutralEmoji from '../assets/neutral.PNG';
import Toaster from './Toaster';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://new-my-journals.vercel.app/';

const Card = ({ id, title, date, mood, content, tags, emoji, eye, write, del, onDelete, onUpdate }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [showEditForm, setShowEditForm] = useState(false);
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
        setIsSaving(true);
        const fd = new FormData();
        fd.append("title", formData.title);
        fd.append("content", formData.content);
        fd.append("journalDate", formData.journalDate);

        try {
            await fetch(`${API_BASE_URL}journals/${id}`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            setToaster({ visible: true, message: "Journal updated successfully!" });
            setShowEditForm(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            setToaster({ visible: true, message: "Failed to update journal." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`${API_BASE_URL}journals/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setToaster({ visible: true, message: "Journal deleted successfully!" });
            setShowConfirm(false);
            onDelete(id);
        } catch (error) {
            setToaster({ visible: true, message: "Failed to delete journal." });
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white p-4 md:p-6 rounded-2xl mb-4 shadow-sm h-full">

                <div className="flex justify-between mb-2 flex-wrap gap-2">
                    <div>
                        <h3 className="font-semibold text-[#2B3674]">{title}</h3>
                        <p className="text-xs text-[#A3AED0] font-[500]">{date}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#F4F7FE] px-2 py-1 rounded-full text-sm">
                        <img src={moodEmojis[mood] || emoji} alt="" className="w-4 h-4 object-contain" />
                        {mood}
                    </div>
                </div>

                <p className="text-sm text-[#A3AED0] mb-2">
                    "{content?.substring(0, 60)}..."
                </p>

                <div className="flex justify-between items-center flex-wrap gap-2">
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
                            onClick={() => navigate('/Notevia', { state: { journalId: id } })}
                        />
                        <img
                            src={write}
                            alt="edit"
                            className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded"
                            onClick={() => setShowEditForm(!showEditForm)}
                        />

                        {/* 🗑️ Delete */}
                        <img
                            src={del}
                            alt="delete"
                            className="bg-[#F4F7FE] w-8 h-8 object-contain cursor-pointer p-1 rounded"
                            onClick={() => setShowConfirm(true)}
                        />
                    </div>
                </div>

                {showEditForm && (
                    <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                        <div>
                            <label className="text-xs text-[#A3AED0]">Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#4318FF]" />
                        </div>
                        <div>
                            <label className="text-xs text-[#A3AED0]">Content</label>
                            <textarea name="content" value={formData.content} onChange={handleChange} rows={3} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#4318FF]" />
                        </div>
                        <div>
                            <label className="text-xs text-[#A3AED0]">Date</label>
                            <input type="date" name="journalDate" value={formData.journalDate} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#4318FF]" />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setShowEditForm(false)} className="px-4 py-2 text-sm rounded-lg border text-[#A3AED0]">Cancel</button>
                            <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 text-sm rounded-lg bg-[#2B3674] text-white disabled:opacity-60">
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl p-6 w-[300px] shadow-xl text-center">
                        <p className="text-[#2B3674] font-semibold text-base mb-1">Delete Journal?</p>
                        <p className="text-sm text-[#A3AED0] mb-5">
                            Are you sure you want to delete this journal? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setShowConfirm(false)} className="px-5 py-2 rounded-lg border text-[#A3AED0] text-sm">Cancel</button>
                            <button onClick={handleDelete} disabled={isDeleting} className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm disabled:opacity-60">
                                Delete
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
