import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUsr } from '../Redux/Reducer/VegorderSlice';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://todo-backend-1-q0tf.onrender.com';


function HeaderCom() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loginStatus, token } = useSelector(state => state.vegUser)

    const backToHome = () => {
        navigate('/')
    }

    const handlelog = async () => {
        const res = await fetch(`${API_URL}/orderVeg/logout`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        })

        if (res) {
            dispatch(logoutUsr())
        } else {
            navigate('/veglogin')
        }
    }

    return (
        <div className='w-full py-3 px-4 bg-green-300/60'>
            <div className='flex items-center justify-between'>

                <div className='flex justify-start'>
                    <img src="https://www.freepnglogos.com/uploads/logo-home-png/photo-icon-home-logo-23.png" alt="home" className="w-12 h-10 object-contain cursor-pointer hover:scale-110 transition-transform" onClick={backToHome} />
                </div>


                <div className='text-center flex-1'>
                    <p className="font-bold text-gray-800 text-xl md:text-2xl m-0">Eagle Web Services</p>
                </div>


                <div className='flex items-center gap-4'>
                    <i className="bi bi-cart3 text-xl text-gray-700 cursor-pointer hover:text-green-600 transition-colors"></i>
                    {loginStatus == 1 ? (
                        <span className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline transition-colors font-medium"
                            onClick={handlelog}>
                            Logout
                        </span>
                    ) : (
                        <span className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline transition-colors font-medium">
                            LogIn
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeaderCom
