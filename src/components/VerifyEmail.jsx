import mountainsImg from '../assets/Group.PNG';
import logo from '../assets/Neografica.PNG';
import bg from '../assets/bg.PNG';

const VerifyEmail = () => {
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
                        Verify Your Email
                    </h2>

                    <p className="text-center text-sm sm:text-base leading-6 sm:leading-7 font-medium text-gray-500 mt-2">
                        We've sent a 6-digit verification code to
                    </p>

                    <p className="text-center text-base sm:text-lg font-medium text-[#1B2559] pb-4">
                        your email address
                    </p>

                    {/* OTP Boxes */}
                    <div className="flex justify-between gap-2 sm:gap-3 mb-6">
                        {Array(6)
                            .fill(0)
                            .map((_, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    maxLength="1"
                                    className="w-10 sm:w-12 h-10 sm:h-12 text-center text-lg sm:text-2xl bg-[#FAFBFF] border border-[#E6EDFF] rounded"
                                />
                            ))}
                    </div>

                    {/* Continue Button */}
                    <button
                        type="submit"
                        className="w-full h-10 sm:h-12 bg-[#4318FF] rounded-3xl font-bold text-white mt-4"
                    >
                        Continue
                    </button>

                    <p className="text-center text-xs sm:text-sm font-normal pt-4 text-[#A3AED0]">
                        Resend OTP in (timer) seconds
                    </p>

                    <p className="text-center pt-2">
                        <a
                            href="#"
                            className="text-[#4318FF] font-semibold text-xs sm:text-sm leading-6"
                        >
                            Back to Sign Up
                        </a>
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
    );
};

export default VerifyEmail;