import React, { useState } from 'react'
import LoginHeader from './LoginHeader'
import { useNavigate } from 'react-router-dom';
import LandingFooter from '../LandingPage/LandingFooter';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import { setUser } from '../Redux/Reducer/UserSlice';
import { useDispatch } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://todo-backend-1-q0tf.onrender.com';

function Login() {
    const [regBox, setRegBox] = useState(false)
    const [regData, setRegData] = useState({ fname: '', lname: "", gender: "", phone: "", regUsername: "", regEmail: "", regPass: "" })
    const [logData, setLogData] = useState({ userName: "", pass: "" })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [viewPassword, setViewPassword] = useState(false)
    const [viewRegPass, setViewRegPass] = useState(false)

    const viewPass = () => setViewPassword(!viewPassword)
    const handleRegPass = () => setViewRegPass(!viewRegPass)
    const handleReg = (e) => { e.preventDefault(); setRegBox(true) }
    const handleLog = (e) => { e.preventDefault(); setRegBox(false) }

    const handleRegChange = (e) => {
        setRegData({ ...regData, [e.target.id]: e.target.value })
    }

    const handleRegPhone = (value) => {
        setRegData({ ...regData, phone: value })
    }

    const handleRegister = async () => {
        try {
            const res = await fetch(`${API_URL}/register/regUser`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regData)
            })
            const data = await res.json()
            if (!res.ok) {
                toast.warning(data.message);
            } else {
                toast.success('Registration Successful!')
                setRegBox(false)
                setRegData({ fname: '', lname: '', gender: '', phone: '', regUsername: '', regEmail: '', regPass: '' });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Server error. Try again later.");
        }
    }

    const handleLogData = (e) => {
        setLogData({ ...logData, [e.target.id]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/register/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: logData.userName, pass: logData.pass })
            });
            const data = await res.json();
            if (!res.ok) {
                toast.warning(data.message);
            } else {
                toast.success("Login Successful!");
                dispatch(setUser({ user: data.data.user, token: data.data.token }))
                navigate('/todo')
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Server error. Try again later.");
        }
    };

    return (
        <div className='min-h-screen flex flex-col bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "url('https://wallpapers.com/images/hd/dark-theme-background-8xlni5mkdutatc7r.jpg')" }}>
            <LoginHeader />

            <div className='flex-1 flex items-center justify-center p-3 sm:p-5'>
                {!regBox ? (
                    <form onSubmit={handleLogin} className='w-full max-w-xs sm:max-w-md lg:max-w-lg'>
                        <div className='backdrop-blur-md bg-black/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl'>
                            <p className='text-xl sm:text-2xl font-bold text-green-500 underline text-center mb-4 sm:mb-6'>Login</p>

                            <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>User Name</label>
                                <input type='text' id='userName' className='w-full sm:w-2/3 p-2 sm:p-3 rounded-lg font-semibold text-sm sm:text-base' placeholder='Enter your username' value={logData.userName} onChange={handleLogData} />
                            </div>

                            <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2 relative'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>Password</label>
                                <div className='relative w-full sm:w-2/3'>
                                    <input type={viewPassword ? "text" : "password"} id='pass' className='w-full p-2 sm:p-3 rounded-lg font-semibold pr-10 text-sm sm:text-base' placeholder='Enter your password' value={logData.pass} onChange={handleLogData} />
                                    <i className={`bi ${viewPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600`} onClick={viewPass}></i>
                                </div>
                            </div>

                            <div className='text-center mb-4 mt-5'>
                                <button type='submit' className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 sm:px-12 rounded-lg transition-colors text-sm sm:text-base'>Login</button>
                            </div>

                            <p className='text-center text-white text-sm sm:text-base'>
                                Don't have an account? <span className='text-yellow-400 cursor-pointer hover:underline' onClick={handleReg}>Register</span>
                            </p>
                        </div>
                    </form>
                ) : (
                    <div className='w-full max-w-xs sm:max-w-lg lg:max-w-2xl backdrop-blur-md bg-black/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl'>
                        <p className='text-xl sm:text-2xl font-bold text-blue-500 underline text-center mb-4 sm:mb-6'>Register</p>

                        <div className='flex flex-col gap-3 sm:gap-4'>
                            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2  mb-3'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>First Name</label>
                                <input type='text' id='fname' className='w-full sm:w-2/3 p-2 sm:p-3 rounded-lg font-semibold text-sm sm:text-base' placeholder='Enter your first name' value={regData.fname} onChange={handleRegChange} />
                            </div>

                            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2  mb-3'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>Last Name</label>
                                <input type='text' id='lname' className='w-full sm:w-2/3 p-2 sm:p-3 rounded-lg font-semibold text-sm sm:text-base' placeholder='Enter your last name' value={regData.lname} onChange={handleRegChange} />
                            </div>

                            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2  mb-3'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>Gender</label>
                                <select id='gender' className='w-full sm:w-2/3 p-2 sm:p-3 rounded-lg font-semibold text-sm sm:text-base' value={regData.gender} onChange={handleRegChange}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>Phone</label>
                                <div className='w-full sm:w-2/3'>
                                    <PhoneInput country={'in'} value={regData.phone} onChange={handleRegPhone} inputStyle={{ width: '100%', height: '42px', fontSize: '14px', borderRadius: '8px' }} />
                                </div>
                            </div>

                            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2  mb-3'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>User Name</label>
                                <input type='text' id='regUsername' className='w-full sm:w-2/3 p-2 sm:p-3 rounded-lg font-semibold text-sm sm:text-base' placeholder='Enter your username' value={regData.regUsername} onChange={handleRegChange} />
                            </div>

                            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2  mb-3'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>Email</label>
                                <input type='email' id='regEmail' className='w-full sm:w-2/3 p-2 sm:p-3 rounded-lg font-semibold text-sm sm:text-base' placeholder='Enter your email' value={regData.regEmail} onChange={handleRegChange} />
                            </div>

                            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2  mb-3'>
                                <label className='text-white font-bold text-sm sm:text-base sm:w-1/3'>Password</label>
                                <div className='relative w-full sm:w-2/3'>
                                    <input type={viewRegPass ? "text" : "password"} id='regPass' className='w-full p-2 sm:p-3 rounded-lg font-semibold pr-10 text-sm sm:text-base' placeholder='Enter your password' value={regData.regPass} onChange={handleRegChange} />
                                    <i className={`bi ${viewRegPass ? "bi-eye-slash-fill" : "bi-eye-fill"} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600`} onClick={handleRegPass}></i>
                                </div>
                            </div>
                        </div>

                        <div className='text-center mt-4 sm:mt-6'>
                            <button type='button' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-8 sm:px-12 rounded-lg transition-colors text-sm sm:text-base' onClick={handleRegister}>Register</button>
                        </div>

                        <p className='text-center text-white mt-3 sm:mt-4 text-sm sm:text-base'>
                            Already have an account? <span className='text-yellow-400 cursor-pointer hover:underline' onClick={handleLog}>Login</span>
                        </p>
                    </div>
                )}
            </div>

            <LandingFooter />
        </div>
    )
}

export default Login
