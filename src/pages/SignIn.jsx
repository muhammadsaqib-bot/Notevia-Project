import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import mountainsImg from '../assets/Group.png';
import logo from '../assets/Neografica.png';
import bg from '../assets/bg.png';
import Toaster from '../components/Toaster';
import Notevia from './Notevia';

const API_BASE_URL = 'https://new-my-journals.vercel.app/';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [toastMsg, setToastMsg] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [resetEmail, setResetEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetError, setResetError] = useState('');
    const [resetLoading, setResetLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/Notevia', { replace: true });
    }, [navigate]);

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}auth/login`, { email, password });
            const { token, message } = response.data;

            localStorage.setItem('token', token);
            showToast(message || "Login successful 🎉");
            navigate("/Notevia");
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong";
            if (msg === "Please verify your account first") {
                showToast(msg);
                setTimeout(() => navigate("/VerifyEmail", { state: { email } }), 1200);
            } else {
                setError(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    const sendOtp = async () => {
        try {
            setResetLoading(true);
            await axios.post(`${API_BASE_URL}auth/forgot-password`, { email: resetEmail });
            showToast("OTP sent to your email ✅");
            setStep(2);
            setResetError('');
        } catch (err) {
            setResetError(err.response?.data?.message || "Something went wrong");
        } finally {
            setResetLoading(false);
        }
    };

    const resetPassword = async () => {
        try {
            setResetLoading(true);
            await axios.post(`${API_BASE_URL}auth/reset-password`, {
                email: resetEmail,
                otp,
                newPassword
            });
            showToast("Password changed successfully ✅");
            setForgotPasswordOpen(false);
            setStep(1);
            setOtp('');
            setNewPassword('');
            setResetEmail('');
        } catch (err) {
            setResetError(err.response?.data?.message || "Something went wrong");
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <>
            {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}

            <div
                className="max-w-full min-h-screen bg-[#F4F7FE] flex justify-center items-center relative py-10"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className="flex flex-col gap-6 relative z-10 w-full max-w-md px-4">
                    <div className="flex justify-center items-center gap-2 ">
                        <img src={logo} alt="Logo" className="w-10 h-10" />
                        <h3 className="text-[26px] font-bold text-[#1B2559]">NOTEVIA</h3>
                    </div>

                    <form onSubmit={handleLogin} className="rounded-2xl bg-white w-[502px] p-8">
                        <h2 className="font-[700] text-center text-[34px] font-bold text-[#1B2559]">Welcome back</h2>
                        <p className='text-[#A3AED0] text-center font-[500] text-[16px]'>Sign in to your account</p>

                        {error && <div className="bg-red-100 text-red-600 p-2 rounded mt-4 text-sm">{error}</div>}

                        <label className="block mt-4">
                            <p className="font-[400] text-[16px] leading-[28px] text-[#1B2559]">Email</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="outline-none bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                                required
                            />
                        </label>

                        <label className="block mt-4">
                            <p className=" font-[400] text-[16px] leading-[28px] text-[#1B2559]">Password</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="outline-none bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                                required
                            />
                        </label>

                        <div className="flex justify-between mt-2">
                            <div className="flex gap-2 items-center">
                                <input type="radio" />
                                <p className='text-[#1B2559] text-[14px] font-[400]'>Remember Me</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setForgotPasswordOpen(true);
                                    setStep(1);
                                    setResetEmail(email);
                                    setResetError('');
                                    setOtp('');
                                    setNewPassword('');
                                }}
                                className="cursor-pointer text-[#4318FF] text-[14px] font-[400]"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-[#4318FF] rounded-3xl font-bold text-white mt-8 disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <p className="text-center text-sm mt-3 text-[#A3AED0]">
                            Don't have an account?{' '}
                            <Link to='/' className="text-[#4318FF] font-semibold">Sign Up</Link>
                        </p>
                    </form>
                </div>

                <img
                    src={mountainsImg}
                    alt="Mountains"
                    className="fixed bottom-20 right-20 w-1/5 h-auto pointer-events-none"
                />

                {forgotPasswordOpen && (
                    <div className="fixed inset-0 bg-gray-100 shadow-sm  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
                            <button
                                onClick={() => setForgotPasswordOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 font-bold text-xl"
                            >
                                &times;
                            </button>

                            {step === 1 && (
                                <>
                                    <h2 className="text-2xl font-bold text-[#1B2559] mb-4 text-center">
                                        Enter Your Email
                                    </h2>
                                    {resetError && <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{resetError}</div>}
                                    <input
                                        type="email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3 mb-4"
                                        placeholder="Email"
                                    />
                                    <button
                                        onClick={sendOtp}
                                        disabled={resetLoading}
                                        className="w-full h-12 bg-[#4318FF] text-white font-bold rounded-3xl disabled:opacity-50"
                                    >
                                        {resetLoading ? "Sending..." : "Send OTP"}
                                    </button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <h2 className="text-2xl font-bold text-[#1B2559] mb-4 text-center">
                                        Reset Password
                                    </h2>
                                    {resetError && <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{resetError}</div>}
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3 mb-4"
                                        placeholder="OTP"
                                    />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3 mb-4"
                                        placeholder="New Password"
                                    />
                                    <button
                                        onClick={resetPassword}
                                        disabled={resetLoading}
                                        className="w-full h-12 bg-[#4318FF] text-white font-bold rounded-3xl disabled:opacity-50"
                                    >
                                        {resetLoading ? "Resetting..." : "Reset Password"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SignIn;