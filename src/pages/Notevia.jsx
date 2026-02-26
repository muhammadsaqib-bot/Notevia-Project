import logo from '../assets/Neografica.PNG'
import dashboard from '../assets/dashboardIcon.PNG'
import journal from '../assets/JournalIcon.PNG'
import pen from '../assets/penIcon.PNG'
import profile from '../assets/ProfileIcon.PNG'
import edit from '../assets/bluePen.PNG'
import remove from '../assets/basket.PNG'
import emoji from '../assets/emoji.PNG'
import copy from '../assets/copy.PNG'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import Toaster from "../components/Toaster";

const NoteviApp = () => {
  const API_BASE_URL = 'https://new-my-journals.vercel.app/';
  const [name, setName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 2000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get(`${API_BASE_URL}profiles/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response);

        setName(response.data.full_name || response.data.name || "Guest");
      } catch (err) {
        if (err.response?.status === 401) {
          showToast("Please verify your PIN");
          setTimeout(() => {
            navigate("/ConfirmPin");
          }, 1500);
          return;
        }
        const msg = err.response?.data?.message || "Session expired. Please login again.";
        showToast(msg);
        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/SignIn");
        }, 1500);
      }
    };

    fetchProfile();
  }, []);


  return (
    <div className='max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row'>
      {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}

      {/* Sidebar */}
      <div className={`w-full md:w-[290px] md:h-screen md:fixed top-0 left-0 bg-white px-[20px] shadow-sm shrink-0 z-50 transition-all duration-300 ${isMenuOpen ? 'h-auto pb-5' : 'h-[80px] overflow-hidden md:h-screen'}`}>
        <div className='flex gap-5 mt-6 md:mt-[55px] mb-5 items-center justify-between md:justify-center w-full h-[45px] rounded-[5px] md:border-b border-[#E6EDFF] md:pb-10'>
          <div className="flex items-center gap-4 pr-[35px]">
            <img src={logo} alt="" />
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

        <Link to='/Dashboard1' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-8 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-[16px] w-[16px]' src={dashboard} alt="" />
            <span className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Dashboard</span>
          </div>
        </Link>

        <Link to='/Journals' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-8 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-[20px] w-[17px]' src={journal} alt="" />
            <span className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Journals</span>
          </div>
        </Link>

        <Link to='/AddJournal' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-8 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-[20px]' src={pen} alt="" />
            <span className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Add journal</span>
          </div>
        </Link>

        <Link to='/Profile' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-8 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-[20px]' src={profile} alt="" />
            <span className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Profile</span>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className='md:ml-[290px] flex-1 p-4 md:p-8 overflow-x-hidden'>

        {/* Greeting */}
        <p className='text-[#707EAE] text-[14px] font-[700] leading-[24px] '>Hi {name || 'User'},</p>
        <h1 className='text-[#2B3674] text-2xl md:text-[34px] font-[700] mb-6 md:mb-8'>Welcome to Notevia!</h1>

        {/* Journal Card */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5'>

          <div className='flex items-center gap-3'>
            {/* Back arrow */}
            <svg className='w-5 h-5 text-[#A3AED0] cursor-pointer' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            <span className='text-[#2B3674] font-[600] text-[20px]'>New Journal</span>
          </div>
          <div className='flex gap-2'>
            <button className='flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#EDE8FF] text-[#4318FF] text-[14px] font-[600]  hover:bg-[#e9edfc] transition-colors'>
              {/* pencil icon */}
              <img src={edit} alt="" />
              Edit
            </button>
            {/* Delete Button */}
            <button className='flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#FF18181A] text-[#E53E3E] text-[14px] font-[600] hover:bg-[#ffe5e5] transition-colors'>
              {/* trash icon */}
              <img src={remove} alt="" />
              Delete
            </button></div>
        </div>

        <div className='bg-white rounded-[16px] p-6 shadow-sm'>

          {/* Card Header */}


          {/* Divider */}
          {/* <hr className='border-[#E6EDFF] mb-4' /> */}

          {/* Journal Title Row */}
          <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-1'>
            <div>
              <h2 className='text-[#2B3674] text-xl md:text-[24px] font-[600]'>New Beginnings</h2>
              <p className='text-[#A3AED0] text-sm md:text-[16px] font-[500] mt-1'>8 Feb 2026</p>
            </div>
            {/* Mood Badge */}
            <div className='py-[6px] px-[10px] flex w-[85px] h-[30px]flex items-center gap-2 bg-[#F0EFFE]  rounded-[8px]'>
              <span className='text-[18px]'><img src={emoji} alt="" /></span>
              <span className='text-[#4318FF] font-[300] text-[14px]'>Happy</span>
            </div>
          </div>

          {/* Divider */}
          <hr className='border-[#E6EDFF] my-4' />

          {/* Journal Body */}
          <div className='space-y-3 text-[#A3AED0] text-base md:text-[18px] leading-[130%] font-[500]'>
            <p>
              Today marks the start of a new chapter. I decided to take journaling seriously as a tool for self-reflection and mental clarity. Writing helps me organize my thoughts and process emotions in a healthy way. Here's to showing up for myself every day.
            </p>
            <p>
              Spent the entire day indoors reading and journaling. Made some hot chocolate and listened to lo-fi music. Days like these are necessary for recharging. I didn't accomplish anything productive in the traditional sense, but I feel more at peace than I have in weeks.
              Today marks the start of a new chapter. I decided to take journaling seriously as a tool for self-reflection and mental clarity. Writing helps me organize my thoughts and process emotions in a healthy way. Here's to showing up for myself every day.
            </p>
            <p>
              Spent the entire day indoors reading and journaling. Made some hot chocolate and listened to lo-fi music. Days like these are necessary for recharging. I didn't accomplish anything productive in the traditional sense, but I feel more at peace than I have in weeks.
            </p>
          </div>

          {/* Tags Row */}
          <div className='flex items-center justify-between mt-6'>
            <div className='flex gap-2'>
              <span className='px-3 py-1 rounded-full bg-[#F0F0F0] text-[#1B2559] text-[14px] font-[300]'>Growth</span>
              <span className='px-3 py-1 rounded-full bg-[#F0F0F0] text-[#2B3674] text-[14px] font-[300]'>Personal</span>
            </div>
            {/* Copy icon */}
            <button className='bg-[#F4F7FE] p-2 rounded hover:text-[#1B2559] transition-colors'>
              <img src={copy} alt="" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NoteviApp