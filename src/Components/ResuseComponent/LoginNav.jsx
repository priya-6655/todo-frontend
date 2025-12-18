import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginNav() {
    const navigate = useNavigate()

    const backTodo = () => {
        navigate('/todo')
    }

    const handlelogout = () => {
        navigate('/login')
    }

    return (
        <div className='w-full py-3 px-4 bg-gray-300/60'>
            <div className='flex items-center justify-between'>
                <div className='flex justify-start'>
                    <img src="https://www.freepnglogos.com/uploads/logo-home-png/photo-icon-home-logo-23.png" alt="home"
                        className="w-12 h-10 object-contain cursor-pointer hover:scale-110 transition-transform" onClick={backTodo} />
                </div>

                <div className='text-center flex-1'>
                    <p className="font-bold text-gray-800 text-xl md:text-2xl m-0">Eagle Web Services</p>
                </div>

                <div className='text-right'>
                    <span className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline transition-colors font-medium"
                        onClick={handlelogout}>
                        Logout
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LoginNav
