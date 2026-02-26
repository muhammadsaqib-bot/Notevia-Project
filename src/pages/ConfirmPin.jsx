import { useState, useEffect } from "react";
import mountainsImg from '../assets/Group.PNG';
import logo from '../assets/Neografica.PNG';
import bg from '../assets/bg.PNG';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";
import { Link } from "react-router-dom";

const ConfirmPin = () => {
    const API_BASE_URL = 'https://new-my-journals.vercel.app/';
    const [pin, setPin] = useState(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
    };

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    const handleVerifyPin = async (e) => {
        e.preventDefault();
        setError(null);

        if (pin.some((digit) => digit === "")) {
            setError("Please enter your full 4-digit PIN");
            return;
        }

        const pinString = pin.join("");

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_BASE_URL}pin/verify`,
                { pin: pinString },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success || response.status === 200) {
                if (response.data.accessToken) localStorage.setItem('token', response.data.accessToken);
                else if (response.data.token) localStorage.setItem('token', response.data.token);

                showToast("PIN verified successfully!");
                setTimeout(() => navigate('/Notevia'), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid PIN. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
            {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}

            {/* Mirrored background for large screens */}
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
                <form onSubmit={handleVerifyPin} className="rounded-3xl bg-white w-full p-6 sm:p-10 shadow-sm">
                    <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1B2559]">
                        Confirm your PIN
                    </h2>
                    <p className="text-center text-sm sm:text-base mt-2 text-[#A3AED0]">
                        Please confirm your PIN
                    </p>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-xl mt-4 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* PIN Boxes */}
                    <div className="flex justify-center gap-2 sm:gap-4 mt-6 mb-6">
                        {pin.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                className={`w-12 sm:w-16 h-12 sm:h-16 text-center text-lg sm:text-2xl font-semibold bg-[#FAFBFF] rounded-xl outline-none transition 
                  ${digit ? "border-2 border-[#4318FF]" : "border border-[#E6EDFF]"}`}
                            />
                        ))}
                    </div>

                    {/* Continue Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 sm:h-14 bg-gradient-to-r from-[#4318FF] to-[#6A53FF] rounded-full font-medium text-white disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Continue"}
                    </button>

                    {/* Back Link */}
                    <p className="text-center text-xs sm:text-sm mt-4 sm:mt-6 text-[#A3AED0]">
                        Back to{" "}
                        <Link to='/CreatePin' className="text-[#4318FF] font-semibold underline cursor-pointer">
                            Create PIN
                        </Link>
                    </p>
                </form>
            </div>

            {/* Mountains Image */}
            <img
                src={mountainsImg}
                alt="Mountains"
                className="fixed bottom-5 sm:bottom-20 right-5 sm:right-20 w-1/3 sm:w-1/5 h-auto pointer-events-none"
            />
        </div>
    );
};

export default ConfirmPin;