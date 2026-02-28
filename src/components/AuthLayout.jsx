import React from 'react';
import bg from '../assets/bg.png';
import mountainsImg from '../assets/Group.png';

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F4F7FE] flex justify-center items-center relative w-full py-10">
            <img
                src={bg}
                alt=""
                className="fixed left-0 top-0 h-[60vh] object-cover z-0 pointer-events-none hidden md:block"
            />

            <img
                src={bg}
                alt=""
                className="fixed right-0 top-0 h-[60vh]  object-cover z-0 pointer-events-none hidden md:block"
                style={{ transform: 'scaleX(-1)' }}
            />

            <div className="relative z-10 w-full flex justify-center items-center">
                {children}
            </div>

            <img
                src={mountainsImg}
                alt="Mountains"
                className="fixed bottom-5 sm:bottom-20 right-5 sm:right-20 w-1/3 sm:w-1/5 h-auto pointer-events-none z-0"
            />
        </div>
    );
};

export default AuthLayout;
