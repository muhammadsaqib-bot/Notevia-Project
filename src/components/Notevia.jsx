import logo from '../assets/Neografica.PNG'
import dashboard from '../assets/dashboardIcon.PNG'
import journal from '../assets/JournalIcon.PNG'
import pen from '../assets/penIcon.PNG'
import profile from '../assets/ProfileIcon.PNG'
const NoteviApp = () => {
  return (
    <div className='min-w-screen min-h-screen bg-sky-50 '>
      <div className='w-[290px] h-screen fixed top-0 left-0 bg-white px-[20px]'>
        <div className=' flex gap-2 mt-20 mb-5 items-center justify-center w-full h-[45px] rounded-[5px] border: border-b-1 border-[#E6EDFF] pb-10'>
          <img src={logo} alt="" />
          <h2 className='font-[800] text-[26px] leading[120%] text-center '>NOTEVIA</h2>
        </div>
        <div className='h-[45px] w-full flex bg-gray-300'>
          <img src={dashboard} alt="" />
          <p className='text-[#A3AED0]'>Dashboard</p>
        </div>
        <div className=''>
          <p>Journals</p>
          <img src={journal} alt="" />
        </div>
        <div>
          <img src={pen} alt="" />
          <p>Add Journal</p>
        </div>
        <div>
          <img src={profile} alt="" />
          <p>Profile</p>
        </div>
      </div>
    </div>
  )
}

export default NoteviApp
