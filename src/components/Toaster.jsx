import React, { useEffect, useState } from 'react'

const Toaster = ({ message = '', visible = true, duration = 5000, onClose }) => {
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

    return (
        <div style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: '#333',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            zIndex: 9999,
            maxWidth: '80vw'
        }}>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.4 }}>{message}</p>
        </div>
    )
}

export default Toaster
