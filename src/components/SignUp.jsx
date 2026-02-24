import { useState } from 'react';
import mountainsImg from '../assets/Group.PNG';
import logo from '../assets/Neografica.PNG';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/bg.PNG';
import axios from 'axios';

const API_BASE_URL = 'https://new-my-journals.vercel.app/';

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function SignUpSubmitted(e) {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${API_BASE_URL}auth/register`,
                {
                    name: formData.fullName,
                    email: formData.email,
                    passwordHash: formData.password,
                }
            );

            setMessage("Account created successfully 🎉");

            // Save token if backend returns one
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            setTimeout(() => {
                navigate('/VerifyEmail', { state: { email: formData.email } });
            }, 1500);

        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

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
            <div className="flex flex-col gap-6 relative z-10 w-full max-w-md px-4">
                <div className="pl-20 flex justify-center items-center gap-2 ">
                    <img src={logo} alt="Logo" className="w-10 h-10" />
                    <h3 className="text-[26px] font-bold text-[#1B2559]">NOTEVIA</h3>
                </div>

                <form onSubmit={SignUpSubmitted} className="rounded-2xl bg-white w-[502px] p-8">
                    <h2 className="text-center text-[34px] font-[700] text-[#1B2559]">
                        Create Account
                    </h2>
                    <p className='text-[#A3AED0] text-center font-[500] text-[16px]'>Start your jaournling journey</p>


                    {error && (
                        <div className="bg-red-100 text-red-600 p-2 rounded mt-4 text-sm">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-100 text-green-600 p-2 rounded mt-4 text-sm">
                            {message}
                        </div>
                    )}

                    <label className="block mt-4">
                        <p className="text-[#1B2559] font-[400] text-[16px] leading-[28px] ">Full Name</p>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                        />
                    </label>

                    <label className="block mt-4">
                        <p className="text-[#1B2559] font-[400] text-[16px] leading-[28px]">Email</p>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                        />
                    </label>

                    <label className="block mt-4">
                        <p className="text-[#1B2559] font-[400] text-[16px] leading-[28px]">Password</p>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                        />
                    </label>

                    <label className="block mt-4">
                        <p className="text-[#1B2559] font-[400] text-[16px] leading-[28px]">Confirm Password</p>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 text-[16px] bg-[#4318FF] rounded-3xl font-[700] text-white mt-8 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create account"}
                    </button>

                    <p className="text-center text-[14px] mt-3 text-[#A3AED0] font-[600]">
                        Already have an account?{' '}
                        <Link to='/SignIn' className="text-[#4318FF] font-[600] text-[14px]">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>

            <img
                src={mountainsImg}
                alt="Mountains"
                className="fixed bottom-20 right-20 w-1/5 h-auto pointer-events-none"
            />
        </div>
    );
};
export default SignUp;