import React, { useEffect, useState } from 'react'

const Toaster = ({ message = '', visible = true, duration = 5000, onClose, type = 'error' }) => {
    const [show, setShow] = useState(visible)

    useEffect(() => {
        setShow(visible)
    }, [visible])

    useEffect(() => {
        if (!show) return
        const timer = setTimeout(() => {
            setShow(false)
            onClose && onClose()
        }, duration)
        return () => clearTimeout(timer)
    }, [show, duration, onClose])

    if (!show) return null

    const isError = type === 'error'
    const accentClass = isError ? 'border-l-[#e53e3e]' : 'border-l-[#38a169]'

    return (
        <div className={`fixed top-6 right-6 bg-white py-3 px-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] z-[9999] max-w-[320px] min-w-[260px] flex items-center gap-[10px] border border-[#f0f0f0] border-l-4 ${accentClass}`}>
            {/* Message only */}
            <div className="flex-1">
                <p className="m-0 text-base text-[#1a1a1a] leading-[1.4] font-sans">
                    {message}
                </p>
            </div>

            {/* Close Button */}
            <button
                onClick={() => {
                    setShow(false)
                    onClose && onClose()
                }}
                className="shrink-0 w-7 h-7 rounded-lg bg-[#4f9cf9] border-none cursor-pointer flex items-center justify-center p-0 -mt-[2px]"
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    )
}

export default Toaster