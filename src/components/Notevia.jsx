import logo from '../assets/Neografica.PNG'
import dashboard from '../assets/dashboardIcon.PNG'
import journal from '../assets/JournalIcon.PNG'
import pen from '../assets/penIcon.PNG'
import profile from '../assets/ProfileIcon.PNG'
import edit from '../assets/bluePen.PNG'
import remove from '../assets/basket.PNG'
import emoji from '../assets/emoji.PNG'
import copy from '../assets/copy.PNG'

const NoteviApp = () => {
  return (
    <div className='w-screen min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row'>

      {/* Sidebar */}
      <div className='w-full md:w-[290px] md:h-screen md:fixed top-0 left-0 bg-white px-[10px] shadow-sm shrink-0'>
        <div className='flex gap-2 mt-6 md:mt-[55px] mb-5 items-center justify-center w-full h-[45px] rounded-[5px] border-b border-[#E6EDFF] pb-10'>
          <img src={logo} alt="" />
          <h2 className='font-[800] text-[26px] leading-[120%] text-center text-[#1B2559]'>NOTEVIA</h2>
        </div>

        <div className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-10 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-[16px] w-[16px]' src={dashboard} alt="" />
            <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Dashboard</p>
          </div>
        </div>

        <div className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-10 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-[20px] w-[17px]' src={journal} alt="" />
            <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Journals</p>
          </div>
        </div>

        <div className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-10 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-[20px]' src={pen} alt="" />
            <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Add journal</p>
          </div>
        </div>

        <div className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-10 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-[20px]' src={profile} alt="" />
            <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Profile</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='md:ml-[290px] flex-1 p-4 md:p-8 overflow-x-hidden'>

        {/* Greeting */}
        <p className='text-[#707EAE] text-[14px] font-[700] leading-[24px] '>Hi Zeeshan,</p>
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