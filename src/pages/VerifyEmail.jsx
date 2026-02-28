import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../assets/Neografica.PNG';
import Toaster from '../components/Toaster'
import { API_BASE_URL } from "../API";
import AuthLayout from '../components/AuthLayout';


const VerifyAccount = () => {
    const { state } = useLocation();
    const navigate = useNavigate()
    const email = state?.email || ''

    useEffect(() => {
        if (!email) {
            navigate('/SignIn', { replace: true })
        }
    }, [email, navigate])

    const [otp, setOtp] = useState(Array(6).fill(''))
    const [timer, setTimer] = useState(60)
    const [loading, setLoading] = useState(false)
    const [toastMsg, setToastMsg] = useState('')
    const [toastOpen, setToastOpen] = useState(false)

    const handleOtpChange = (e, idx) => {
        const val = e.target.value
        if (/^\d?$/.test(val)) {
            const newOtp = [...otp]
            newOtp[idx] = val
            setOtp(newOtp)
            if (val && idx < 5) {
                document.getElementById(`otp-${idx + 1}`).focus()
            }
        }
    }

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
        if (pasteData.every(char => /^\d$/.test(char))) {
            setOtp(pasteData.concat(Array(6 - pasteData.length).fill("")));
        }
    };

    useEffect(() => {
        if (timer > 0) {
            const id = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(id);
        }
    }, [timer]);

    const showToast = (msg) => {
        setToastMsg(msg)
        setToastOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const code = otp.join('')
        if (code.length < 6) {
            showToast('Please enter full 6-digit OTP')
            return
        }

        try {
            setLoading(true)
            const res = await axios.post(`${API_BASE_URL}auth/verify-account`, { email, otp: code })
            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                showToast('Account verified successfully 🎉')
                setTimeout(() => navigate('/CreatePin'), 1500)
            } else {
                showToast(res.data.message || 'Invalid OTP')
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        try {
            setLoading(true)
            await axios.post(`${API_BASE_URL}auth/resend-otp`, { email })
            showToast('OTP resent successfully!')
            setTimer(60)
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to resend OTP')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout>
            {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}

            <div className="flex flex-col gap-6 relative z-10 w-full max-w-md px-4">
                <div className="flex justify-center items-center gap-2">
                    <img src={logo} alt="Logo" className="w-10 h-10" />
                    <h3 className="text-3xl font-bold text-[#1B2559]">NOTEVIA</h3>
                </div>

                <form onSubmit={handleSubmit} className="rounded-2xl bg-white w-full p-8">
                    <h2 className="text-center text-3xl font-bold text-[#1B2559]">Verify Your Account</h2>
                    <p className="text-center text-sm mt-2 text-gray-500">Code sent to</p>
                    <p className="text-center text-base font-medium text-[#1B2559] pb-6">{email}</p>

                    <div className="flex justify-between gap-2 mb-6">
                        {otp.map((val, idx) => (
                            <input
                                onPaste={handlePaste}
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                maxLength="1"
                                value={val}
                                onChange={(e) => handleOtpChange(e, idx)}
                                className="w-12 h-12 text-center text-lg bg-[#FAFBFF] border border-[#E6EDFF] rounded outline-none focus:border-[#4318FF]"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#4318FF] rounded-3xl font-bold text-white mt-4 disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Verifying...' : 'Continue'}
                    </button>

                    <p className="text-center text-sm font-normal pt-4 text-[#A3AED0]">
                        {timer > 0 ? `Resend OTP in ${timer}s` :
                            <button type="button" onClick={handleResend} className="text-[#4318FF] font-semibold">
                                Resend OTP
                            </button>
                        }
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default VerifyAccount