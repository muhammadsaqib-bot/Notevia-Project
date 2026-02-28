import { useState } from "react";
import logo from '../assets/Neografica.PNG';
import axios from "axios";
import Toaster from "../components/Toaster";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../API";
import AuthLayout from '../components/AuthLayout';

const CreatPin = () => {
    const [pin, setPin] = useState(["", "", "", ""]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);

    const handlePaste = (e) => {
        const data = e.clipboardData.getData("text").slice(0, 4).split("");
        if (data.every(char => /^\d$/.test(char))) {
            const newPin = [...data, ...Array(4 - data.length).fill("")];
            setPin(newPin);
            document.getElementById(`pin-${Math.min(data.length, 3)}`)?.focus();
        }
    };

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < 3) {
            document.getElementById(`pin-${index + 1}`).focus();
        }
    };

    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000);
    };

    const SubmitHandle = async (e) => {
        e.preventDefault();
        setError(null);
        const pinString = pin.join("");

        if (pinString.length < 4) {
            setError("Please enter a 4-digit PIN");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}pin/create`,
                { pin: pinString },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );

            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
            }

            showToast("PIN created successfully!");
            setTimeout(() => navigate('/Notevia'), 1500);
        } catch (err) {
            if (err.response?.data?.message === "PIN already exists for this user") {
                return navigate('/Notevia');
            }
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            {toastOpen && <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />}

            <div className="flex flex-col gap-6 sm:gap-10 relative z-10 w-full max-w-md px-4">
                <div className="flex justify-center items-center gap-2">
                    <img src={logo} alt="Logo" className="w-9 h-9 sm:w-10 sm:h-10" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1B2559]">NOTEVIA</h3>
                </div>

                <form onSubmit={SubmitHandle} className="rounded-3xl bg-white w-full p-8 shadow-sm">
                    <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1B2559]">
                        Create a PIN
                    </h2>

                    <p className="text-center text-sm sm:text-base mt-2 text-[#A3AED0]">
                        This will be used to secure your Journal
                    </p>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-xl mt-4 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="bg-[#F4F7FE] rounded-xl p-3 sm:p-4 mt-6">
                        <p className="text-center text-xs sm:text-sm text-[#A3AED0]">
                            Your journals are locked for security. Only you can access them with your PIN
                        </p>
                    </div>

                    <div className="flex justify-center gap-2 sm:gap-4 mt-6 mb-6">
                        {pin.map((digit, index) => (
                            <input
                                onPaste={handlePaste}
                                key={index}
                                id={`pin-${index}`}
                                type="number"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                className={`text-[#1B2559] w-12 sm:w-16 h-12 sm:h-16 text-center text-lg sm:text-2xl font-semibold bg-[#FAFBFF] rounded-xl outline-none transition 
                  ${digit ? "border-2 border-[#4318FF]" : "border border-[#E6EDFF]"}`}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 sm:h-14 bg-gradient-to-r from-[#4318FF] to-[#6A53FF] rounded-full font-bold text-white"
                    >
                        {loading ? "Processing..." : "Continue"}
                    </button>

                    <p className="text-center text-xs sm:text-sm mt-4 sm:mt-6 text-[#A3AED0]">
                        Create a 4-digit PIN to secure your journal entries
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default CreatPin;