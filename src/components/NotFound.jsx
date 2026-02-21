import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>

            <div className="w-screen h-screen flex items-center justify-center bg-[#F4F7FE]">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#1B2559] mb-2">404 - Not Found</h1>
                    <p className="text-[#A3AED0]">The page you are looking for does not exist.</p>
                    <p className="text-[#A3AED0]">Back to
                        <Link to='/' className='font-medium text-[#1B2559]'> Login</Link> Page
                    </p>

                </div>
            </div>

        </div>
    )
}

export default NotFound
