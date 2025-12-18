import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginHeader() {
    const navigate = useNavigate()

    const backtoHome = () => {
        navigate('/')
    }

    return (
        <div className='w-full py-3 px-4 bg-gray-300/60'>
            <div className='flex items-center justify-between'>
                <div className='flex justify-start'>
                    <img src="https://www.freepnglogos.com/uploads/logo-home-png/download-home-image-13.png" alt="home"
                        className="w-12 h-10 object-contain cursor-pointer hover:scale-110 transition-transform" onClick={backtoHome} />
                </div>

                <div className='text-center flex-1'>
                    <p className="font-bold text-gray-800 text-lg m-0">Eagle Web Services</p>
                </div>

                <div className='text-right'>
                    <span className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline transition-colors">
                        Help?
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LoginHeader
