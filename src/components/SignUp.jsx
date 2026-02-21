import mountainsImg from '../assets/Group.PNG';
import logo from '../assets/Neografica.PNG';
import { Link } from 'react-router-dom';
import bg from '../assets/bg.PNG';

const SignUp = () => {
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
                <form className="rounded-2xl bg-white w-full p-6 sm:p-10">
                    <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1B2559]">
                        Create Account
                    </h2>
                    <p className="text-center text-sm sm:text-base leading-6 sm:leading-7 font-medium text-gray-500 mt-2">
                        Start your journaling journey
                    </p>

                    {/* Full Name */}
                    <label className="block mt-4">
                        <p className="text-sm sm:text-base font-normal mb-1">Full Name</p>
                        <input
                            type="text"
                            className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-10 sm:h-12 rounded px-2 sm:px-3"
                        />
                    </label>

                    {/* Email */}
                    <label className="block mt-4">
                        <p className="text-sm sm:text-base font-normal mb-1">Email</p>
                        <input
                            type="email"
                            className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-10 sm:h-12 rounded px-2 sm:px-3"
                        />
                    </label>

                    {/* Password */}
                    <label className="block mt-4">
                        <p className="text-sm sm:text-base font-normal mb-1">Password</p>
                        <input
                            type="password"
                            className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-10 sm:h-12 rounded px-2 sm:px-3"
                        />
                    </label>

                    {/* Confirm Password */}
                    <label className="block mt-4">
                        <p className="text-sm sm:text-base font-normal mb-1">Confirm Password</p>
                        <input
                            type="password"
                            className="bg-[#FAFBFF] border border-[#E6EDFF] w-full h-10 sm:h-12 rounded px-2 sm:px-3"
                        />
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full h-10 sm:h-12 bg-[#4318FF] rounded-3xl font-bold text-white mt-6 sm:mt-8"
                    >
                        Create account
                    </button>

                    {/* Login link */}
                    <p className="text-center text-xs sm:text-sm font-normal mt-3 text-[#A3AED0]">
                        Already have an account?{' '}
                        <Link to={'/'} className="text-[#4318FF] font-semibold">Sign In</Link>
                    </p>
                </form>
            </div>

            {/* Mountains image */}
            <img
                src={mountainsImg}
                alt="Mountains"
                className="fixed bottom-5 sm:bottom-20 right-5 sm:right-20 w-1/3 sm:w-1/5 h-auto pointer-events-none"
            />
            <div className='p-3 rounded text-white absolute right-2 top-2 bg-gray-800'>
                <p className='font-medium'>{msg}</p>
            </div>

        </div>
    );
};

export default SignUp;