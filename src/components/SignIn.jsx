import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import mountainsImg from '../assets/Group.png';
import logo from '../assets/Neografica.png';
import bg from '../assets/bg.png';
import Toaster from '../components/Toaster';

const API_BASE_URL = 'https://new-my-journals.vercel.app/';

const SignIn = () => {
    const navigate = useNavigate();

    // Login form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [toastMsg, setToastMsg] = useState('');
    const [toastOpen, setToastOpen] = useState(false);

    // Forgot password modal state
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [step, setStep] = useState(1); // 1 = enter email, 2 = reset password
    const [resetEmail, setResetEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetError, setResetError] = useState('');
    const [resetLoading, setResetLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/Dashboard1', { replace: true });
    }, [navigate]);

    // Show toast
    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    // Login submit
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}auth/login`, { email, password });
            const res = response.data;
            if (res.success) {
                if (res.token) localStorage.setItem('token', res.token);

                // 👇 NAME SAVE KARO

                const userName = res.user.name;

                navigate("/Dashboard1", {
                    state: { name: userName }
                });

                if (res.token) localStorage.setItem('token', res.token);
                showToast(res.message || "Login successful 🎉");
                // navigate("/Dashboard1", {
                //     state: { name: "Muhammad Saqib" }
                // });
            } else if (res.message === "Please verify your account first") {
                showToast(res.message);
                setTimeout(() => navigate("/VerifyEmail", { state: { email } }), 1200);
            } else {
                setError(res.message || "Login failed");
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    // Handle sending OTP (Step 1)
    const sendOtp = async () => {
        if (!resetEmail) {
            setResetError("Please enter your email");
            return;
        }
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

    // Handle password reset (Step 2)
    const resetPassword = async () => {
        if (!otp || !newPassword) {
            setResetError("Please fill all fields");
            return;
        }
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
                className="w-screen min-h-screen bg-[#F4F7FE] flex justify-center items-center relative overflow-hidden"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Login form */}
                <div className="flex flex-col gap-6 relative z-10 w-full max-w-md px-4">
                    <div className="flex justify-center items-center gap-2">
                        <img src={logo} alt="Logo" className="w-10 h-10" />
                        <h3 className="text-3xl font-bold text-[#1B2559]">NOTEVIA</h3>
                    </div>

                    <form onSubmit={handleLogin} className="rounded-2xl bg-white w-full p-8">
                        <h2 className="text-center text-3xl font-bold text-[#1B2559]">Welcome back</h2>

                        {error && <div className="bg-red-100 text-red-600 p-2 rounded mt-4 text-sm">{error}</div>}

                        <label className="block mt-4">
                            <p className="mb-1">Email</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                            />
                        </label>

                        <label className="block mt-4">
                            <p className="mb-1">Password</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                            />
                        </label>

                        <div className="flex justify-between mt-2">
                            <div className="flex gap-2 items-center">
                                <input type="radio" />
                                <p>Remember Me</p>
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
                                className="cursor-pointer text-[#4318FF] font-medium"
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
                            <Link to={'SignUp'} className="text-[#4318FF] font-semibold">Sign Up</Link>
                        </p>
                    </form>
                </div>

                <img
                    src={mountainsImg}
                    alt="Mountains"
                    className="fixed bottom-20 right-20 w-1/5 h-auto pointer-events-none"
                />

                {/* Forgot Password Modal */}
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