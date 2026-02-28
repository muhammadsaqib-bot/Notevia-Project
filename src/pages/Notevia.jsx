import edit from '../assets/bluePen.PNG'
import remove from '../assets/basket.PNG'
import happyEmoji from '../assets/emoji.PNG'
import sadEmoji from '../assets/sad.PNG'
import neutralEmoji from '../assets/neutral.PNG'
import copy from '../assets/copy.PNG'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Toaster from "../components/Toaster";
import { API_BASE_URL } from "../API";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";


const moodEmojis = {
  "Happy": happyEmoji,
  "Calm": happyEmoji,
  "Neutral": neutralEmoji,
  "Sad": sadEmoji,
};

const NoteviApp = () => {
  const { name } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const [journalId, setJournalId] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', journalDate: '' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) { navigate("/SignIn"); return; }

      try {


        const id = location.state?.journalId;

        let data = null;
        if (id) {
          const res = await axios.get(`${API_BASE_URL}journals/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          data = res.data.data || res.data;
        } else {
          const res = await axios.get(`${API_BASE_URL}journals`, {
            params: { page: 1, limit: 1 },
            headers: { Authorization: `Bearer ${token}` }
          });
          const list = res.data.data || [];
          data = list[0] || null;
        }

        if (data) {
          setTitle(data.title || "");
          setContent(data.content || "");
          setMood(data.mood || "");
          setDate(data.journal_date || "");
          setTags(data.tags || []);
          setJournalId(data.id || data._id);
          setFormData({
            title: data.title || '',
            content: data.content || '',
            journalDate: data.journal_date ? data.journal_date.split('T')[0] : '',
          });
        }

        setIsVerifying(false);
      } catch (err) {
        if (err.response?.status === 401) {
          if (err.response?.data?.message === "PIN verification required") {
            navigate("/ConfirmPin"); return;
          }
          showToast("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/SignIn");
          return;
        }
        showToast("Failed to load journal.");
        setIsVerifying(false);
      }
    };

    fetchData();
  }, [navigate, location]);

  const handleSave = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("token");
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("content", formData.content);
      fd.append("journalDate", formData.journalDate);

      const res = await fetch(`${API_BASE_URL}journals/${journalId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Failed");

      setTitle(formData.title);
      setContent(formData.content);
      setDate(formData.journalDate);
      showToast("Journal updated successfully!");
      setShowEditForm(false);
    } catch (error) {
      showToast("Failed to update journal.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE_URL}journals/${journalId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Journal deleted successfully!");
      setTimeout(() => navigate("/Journals"), 1500);
    } catch (error) {
      showToast("Failed to delete journal.");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
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
    <div className='max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row'>
      {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}

      <Sidebar activePage="notevia" />


      <div className='md:ml-[290px] flex-1 p-4 md:p-8 overflow-x-hidden'>
        <p className='text-[#707EAE] text-[14px] font-[700] leading-[24px]'>Hi {name || 'User'},</p>
        <h1 className='text-[#2B3674] text-2xl md:text-[34px] font-[700] mb-6 md:mb-8'>Welcome to Notevia!</h1>

        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5'>
          <div className='flex items-center gap-3'>
            <svg
              className='w-5 h-5 text-[#A3AED0] cursor-pointer'
              fill='none' stroke='currentColor' viewBox='0 0 24 24'
              onClick={() => navigate(-1)}
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            <span className='text-[#2B3674] font-[600] text-[20px]'>View Journal</span>
          </div>
          {journalId && <div className='flex gap-2'>
            <button
              onClick={() => setShowEditForm(!showEditForm)}
              className='flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#EDE8FF] text-[#4318FF] text-[14px] font-[600] hover:bg-[#e9edfc] transition-colors cursor-pointer'
            >
              <img src={edit} alt="" />
              Edit
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className='flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#FF18181A] text-[#E53E3E] text-[14px] font-[600] hover:bg-[#ffe5e5] transition-colors cursor-pointer'
            >
              <img src={remove} alt="" />
              Delete
            </button>
          </div>}
        </div>

        {!journalId ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#A3AED0]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-semibold text-[#2B3674] mb-1">No Journal Found</p>
            <p className="text-sm mb-6">You haven't written any journals yet.</p>
            <button
              onClick={() => navigate('/AddJournal')}
              className="px-6 py-2 bg-[#4318FF] text-white rounded-xl text-sm font-semibold hover:bg-[#3311cc] transition-colors"
            >
              + Write your first journal
            </button>
          </div>
        ) : (
          <div className='bg-white rounded-[16px] p-6 shadow-sm'>
            <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-1'>
              <div>
                <h2 className='text-[#2B3674] text-xl md:text-[24px] font-[600]'>{title}</h2>
                <p className='text-[#A3AED0] text-sm md:text-[16px] font-[500] mt-1'>
                  {date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ""}
                </p>
              </div>
              <div className='py-[6px] px-[10px] flex items-center gap-2 bg-[#F0EFFE] rounded-[8px] w-fit'>
                <img src={moodEmojis[mood] || happyEmoji} alt="" className="w-5 h-5 object-contain" />
                <span className='text-[#4318FF] font-[300] text-[14px]'>{mood}</span>
              </div>
            </div>

            <hr className='border-[#E6EDFF] my-4' />

            <div className='text-[#A3AED0] text-base md:text-[18px] leading-[130%] font-[500]'>
              <p className="whitespace-pre-wrap">{content}</p>
            </div>

            <div className='flex items-center justify-between mt-6'>
              <div className='flex gap-2 flex-wrap'>
                {tags.length > 0
                  ? tags.map((tag, i) => (
                    <span key={i} className='px-3 py-1 rounded-full bg-[#F0F0F0] text-[#1B2559] text-[14px] font-[300]'>{tag}</span>
                  ))
                  : <span className='px-3 py-1 rounded-full bg-[#F0F0F0] text-[#1B2559] text-[14px] font-[300]'>Journal</span>
                }
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(content); showToast("Copied!"); }}
                className='bg-[#F4F7FE] p-2 rounded hover:opacity-70 transition-opacity'
              >
                <img src={copy} alt="copy" />
              </button>
            </div>

            {showEditForm && (
              <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                <div>
                  <label className="text-xs text-[#A3AED0]">Title</label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#4318FF]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#A3AED0]">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                    className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#4318FF]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#A3AED0]">Date</label>
                  <input
                    type="date"
                    value={formData.journalDate}
                    onChange={(e) => setFormData({ ...formData, journalDate: e.target.value })}
                    className="w-full border rounded-lg p-2 text-sm mt-1 outline-none focus:border-[#4318FF]"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowEditForm(false)} className="px-4 py-2 text-sm rounded-lg border text-[#A3AED0]">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 text-sm rounded-lg bg-[#2B3674] text-white disabled:opacity-60">
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            )}

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
              <button onClick={() => setShowConfirm(false)} className="px-5 py-2 rounded-lg border text-[#A3AED0] text-sm">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={isDeleting} className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm disabled:opacity-60">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NoteviApp;
