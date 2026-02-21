import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import mountainsImg from '../assets/Group.png';
import logo from '../assets/Neografica.png';
import bg from '../assets/bg.png';
import { useState } from 'react';
import axios from 'axios';
import Toaster from '../components/Toaster';

const SignIn = () => {
    const API_BASE_URL = 'https://new-my-journals.vercel.app/';
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    // Toaster state
    const [toastMsg, setToastMsg] = useState('')
    const [toastOpen, setToastOpen] = useState(false)
    const navigate = useNavigate()

    // If already authenticated, redirect to dashboard
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/Dashboard1', { replace: true })
        }
    }, [navigate])

    // Helper to (re)show toaster and restart its timer
    const showToast = (msg) => {
        setToastMsg(msg || '')
        // Toggle visibility to restart Toaster timer if it's already open
        setToastOpen(false)
        setTimeout(() => setToastOpen(true), 0)
    }

    const FormSubmitted = async (e) => {
        e.preventDefault()
        if (!email.trim() || !password.trim()) {
            return;
        }
        axios.post(`${API_BASE_URL}auth/login`, { email, password })
            .then(response => {
                console.log(response);

                const res = response?.data || {}
                const success = !!res?.success
                const message = res?.message
                // Show toaster only with backend-provided message
                if (typeof message === 'string' && message.trim()) {
                    showToast(message)
                }
                if (success) {
                    setEmail('')
                    setPassword('')
                    if (response?.data?.token) {
                        localStorage.setItem('token', response.data.token)
                    }
                    navigate('/Dashboard1')
                }
                console.log(response);

            })


            .catch(error => {
                const message = error?.response?.data?.message
                // Show toaster only with backend-provided error message
                if (typeof message === 'string' && message.trim()) {
                    showToast(message)
                }
                console.log(error);

            });
    }

    return (
        <>
            {toastOpen && (
                <Toaster
                    message={toastMsg}
                    visible={toastOpen}
                    onClose={() => setToastOpen(false)}
                />
            )}
            <div
                className="w-screen min-h-screen bg-[#F4F7FE] flex justify-center items-center relative overflow-hidden"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Optional mirrored bg on larger screens */}
                <div
                    className="absolute right-0 top-0 w-1/2 h-full hidden md:block"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: 'rotate(180deg)',
                    }}
                ></div>

                <div className="flex flex-col gap-6 sm:gap-10 relative z-10 w-full max-w-md px-4">
                    {/* Logo */}
                    <div className="flex justify-center items-center gap-2">
                        <img src={logo} alt="Logo" className="w-9 h-9 sm:w-10 sm:h-10" />
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">NOTEVIA</h3>
                    </div>

                    {/* Form */}
                    <form onSubmit={FormSubmitted} className="rounded-2xl bg-white w-full p-6 sm:p-10">
                        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1B2559]">
                            Welcome back
                        </h2>
                        <p className="text-center text-sm sm:text-base leading-6 sm:leading-7 font-medium text-gray-500 mt-2">
                            Sign in to your account
                        </p>

                        {/* Email */}
                        <label className="block mt-4">
                            <p className="text-sm sm:text-base font-normal mb-1">Email</p>
                            <input
                                required
                                type="email"
                                className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-10 sm:h-12 rounded px-2 sm:px-3"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </label>

                        {/* Password */}
                        <label className="block mt-4">
                            <p className="text-sm sm:text-base font-normal mb-1">Password</p>
                            <input
                                required
                                pattern='^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{8,20}$'
                                type="password"
                                className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-10 sm:h-12 rounded px-2 sm:px-3"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </label>

                        {/* Remember & Forgot */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2 sm:gap-0">
                            <div className="flex items-center gap-2">
                                <input type="radio" />
                                <p className="text-sm sm:text-base font-normal">Remember me</p>
                            </div>
                            <button className="text-[#4318FF] text-sm sm:text-base font-medium">
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-10 sm:h-12 bg-[#4318FF] rounded-3xl font-bold text-white mt-6 sm:mt-8"
                        >
                            Login
                        </button>

                        <p className="text-center text-xs sm:text-sm font-normal mt-3 text-[#A3AED0]">
                            Don't have an account?{' '}
                            {/* <a href="" className="text-[#4318FF] font-semibold">
                            Sign up
                        </a> */}
                            <Link to={'SignUp'} className="text-[#4318FF] font-semibold">Sign Up</Link>
                        </p>
                    </form>
                </div>

                {/* Mountains */}
                <img
                    src={mountainsImg}
                    alt="Mountains"
                    className="fixed bottom-5 sm:bottom-20 right-5 sm:right-20 w-1/3 sm:w-1/5 h-auto pointer-events-none"
                />
            </div>
        </>
    );
};

export default SignIn;