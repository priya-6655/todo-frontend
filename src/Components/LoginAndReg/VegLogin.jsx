import React, { useState } from 'react'
import LoginHeader from './LoginHeader'
import LandingFooter from '../LandingPage/LandingFooter'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function VegLogin() {
    const [isLogin, setIsLogin] = useState(true)
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value })
    const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    const handlePhoneChange = (value) => setRegisterData({ ...registerData, phone: value })

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        toast.success('Login Successful!')
        navigate('/vegpage')
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        toast.success('Registration Successful!')
        setIsLogin(true)
    }

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-green-100 to-green-200'>
            <LoginHeader />

            <div className='flex-1 flex items-center justify-center py-4 px-3'>
                <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md'>

                    {/* Tabs */}
                    <div className='flex gap-2 mb-6'>
                        <button 
                            className={`flex-1 py-2 rounded-lg font-semibold transition ${isLogin ? 'bg-green-600 text-white' : 'border-2 border-green-600 text-green-600 hover:bg-green-50'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button 
                            className={`flex-1 py-2 rounded-lg font-semibold transition ${!isLogin ? 'bg-green-600 text-white' : 'border-2 border-green-600 text-green-600 hover:bg-green-50'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Register
                        </button>
                    </div>

                    {/* Login Form */}
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit}>
                            <p className='text-green-600 text-center text-2xl font-bold mb-1'>Welcome Back!</p>
                            <p className='text-gray-500 text-center mb-6'>Login to order fresh vegetables</p>

                            <div className='mb-4'>
                                <label className='block font-semibold mb-2'>Email</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-envelope-fill"></i>
                                    </span>
                                    <input 
                                        type='email' 
                                        className='flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='email' 
                                        placeholder='Enter your email'
                                        value={loginData.email} 
                                        onChange={handleLoginChange} 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className='block font-semibold mb-2'>Password</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        className='flex-1 border-y border-gray-300 px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='password' 
                                        placeholder='Enter your password'
                                        value={loginData.password} 
                                        onChange={handleLoginChange} 
                                        required 
                                    />
                                    <span 
                                        className='bg-white border border-gray-300 px-3 py-2 rounded-r-lg flex items-center cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} text-gray-500`}></i>
                                    </span>
                                </div>
                            </div>

                            <div className='flex justify-between items-center mb-6 flex-wrap gap-2'>
                                <label className='flex items-center gap-2 text-gray-600 cursor-pointer'>
                                    <input type='checkbox' className='accent-green-600' />
                                    Remember me
                                </label>
                                <a href='#' className='text-green-600 hover:underline'>Forgot Password?</a>
                            </div>

                            <button type='submit' className='w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition mb-4'>
                                Login
                            </button>

                            <p className='text-center text-gray-500'>
                                Don't have an account?
                                <span className='text-green-600 font-semibold cursor-pointer hover:underline ml-1' onClick={() => setIsLogin(false)}>Register</span>
                            </p>
                        </form>
                    ) : (
                        /* Register Form */
                        <form onSubmit={handleRegisterSubmit}>
                            <p className='text-green-600 text-center text-2xl font-bold mb-1'>Create Account</p>
                            <p className='text-gray-500 text-center mb-6'>Join us for fresh vegetables</p>

                            <div className='mb-4'>
                                <label className='block font-semibold mb-2'>Full Name</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-person-fill"></i>
                                    </span>
                                    <input 
                                        type='text' 
                                        className='flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='name' 
                                        placeholder='Enter your name'
                                        value={registerData.name} 
                                        onChange={handleRegisterChange} 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className='block font-semibold mb-2'>Email</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-envelope-fill"></i>
                                    </span>
                                    <input 
                                        type='email' 
                                        className='flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='email' 
                                        placeholder='Enter your email'
                                        value={registerData.email} 
                                        onChange={handleRegisterChange} 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className='block font-semibold mb-2'>Phone</label>
                                <PhoneInput 
                                    country={'in'} 
                                    value={registerData.phone} 
                                    onChange={handlePhoneChange}
                                    inputStyle={{ width: '100%', height: '44px', fontSize: '16px', borderRadius: '8px' }}
                                    containerStyle={{ width: '100%' }} 
                                    placeholder='Enter your phone' 
                                />
                            </div>

                            <div className='mb-6'>
                                <label className='block font-semibold mb-2'>Password</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        className='flex-1 border-y border-gray-300 px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='password' 
                                        placeholder='Create a password'
                                        value={registerData.password} 
                                        onChange={handleRegisterChange} 
                                        required 
                                    />
                                    <span 
                                        className='bg-white border border-gray-300 px-3 py-2 rounded-r-lg flex items-center cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} text-gray-500`}></i>
                                    </span>
                                </div>
                            </div>

                            <button type='submit' className='w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition mb-4'>
                                Register
                            </button>

                            <p className='text-center text-gray-500'>
                                Already have an account?
                                <span className='text-green-600 font-semibold cursor-pointer hover:underline ml-1' onClick={() => setIsLogin(true)}>Login</span>
                            </p>
                        </form>
                    )}
                </div>
            </div>

            <LandingFooter />
        </div>
    )
}

export default VegLogin
