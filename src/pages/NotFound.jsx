import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
            className="min-h-screen bg-[#EFF4FB] flex flex-col items-center justify-center px-6"
        >
            {/* Floating blobs for depth */}
            <div className="fixed top-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full bg-[#c7d9f8] opacity-40 blur-3xl pointer-events-none" />
            <div className="fixed bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#b8cef5] opacity-30 blur-3xl pointer-events-none" />

            {/* Card */}
            <div className="bg-white rounded-[24px] shadow-sm px-12 py-14 flex flex-col items-center max-w-[480px] w-full text-center relative z-10">

                {/* 404 Big Number */}
                <div className="relative mb-2">
                    <span
                        className="text-[120px] font-black leading-none text-[#EFF4FB] select-none"
                        style={{ letterSpacing: '-6px' }}
                    >
                        404
                    </span>
                    <span
                        className="absolute inset-0 flex items-center justify-center text-[120px] font-black leading-none text-transparent select-none"
                        style={{
                            letterSpacing: '-6px',
                            WebkitTextStroke: '2.5px #4318FF',
                        }}
                    >
                        404
                    </span>
                </div>

                {/* Emoji */}
                <div className="text-[48px] mb-5 leading-none">🔍</div>

                {/* Heading */}
                <h1 className="text-[#1B2559] text-[26px] font-[800] mb-3">
                    Page Not Found
                </h1>

                {/* Subtext */}
                <p className="text-[#A3AED0] text-[14px] leading-[24px] mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                {/* Go Home Button */}
                <Link to='/' className='cursor-pointer w-full py-3 rounded-[10px] bg-[#4318FF] text-white text-[15px] font-[700] hover:bg-[#3311cc] transition-colors mb-6'>Go back Home Page</Link>



            </div>
        </div>
    )
}

export default NotFound