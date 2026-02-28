import { useState, useEffect } from 'react';
import logo from '../assets/Neografica.PNG';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../API";
import AuthLayout from '../components/AuthLayout';

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

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/Notevia');
        }
    }, [navigate]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function SignUpSubmitted(e) {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}auth/register`, {
                name: formData.fullName,
                email: formData.email,
                passwordHash: formData.password,
            });

            navigate('/VerifyEmail', { state: { email: formData.email } });
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout>
            <div className="flex flex-col gap-6 relative z-10 w-full max-w-[502px] px-4">
                <div className="flex justify-center items-center gap-2 ">
                    <img src={logo} alt="Logo" className="w-10 h-10" />
                    <h3 className="text-[26px] font-bold text-[#1B2559]">NOTEVIA</h3>
                </div>

                <form onSubmit={SignUpSubmitted} className="rounded-2xl bg-white w-full p-8">
                    <h2 className="max-[750px]:text-[25px] text-center text-[34px] font-[700] text-[#1B2559]">
                        Create Account
                    </h2>
                    <p className='max-[750px]:text-[12px] text-[#A3AED0] text-center font-[500] text-[16px]'>Start your journaling journey</p>


                    {error && (
                        <div className="bg-red-100 text-red-600 p-2 rounded mt-4 text-sm">
                            {error}
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
                            className="outline-none bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
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
                            className="outline-none bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
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
                            className="outline-none bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
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
                            className="outline-none bg-[#FAFBFF] border border-[#E6EDFF] w-full h-12 rounded px-3"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 text-[16px] bg-[#4318FF] rounded-3xl font-[700] text-white mt-8 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create account"}
                    </button>

                    <p className="max-[750px]:text-[12px] text-center text-[14px] mt-3 text-[#A3AED0] font-[600]">
                        Already have an account?{' '}
                        <Link to='/SignIn' className="text-[#4318FF] font-[600] text-[14px]">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};
export default SignUp;