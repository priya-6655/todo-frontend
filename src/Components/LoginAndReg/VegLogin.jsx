import React, { useState } from 'react'
import LoginHeader from './LoginHeader'
import LandingFooter from '../LandingPage/LandingFooter'
import './VegLogin.css'
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

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handlePhoneChange = (value) => {
        setRegisterData({
            ...registerData,
            phone: value
        })
    }

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
        <div className='veg-login-wrapper min-vh-100 d-flex flex-column'>
            <LoginHeader />

            <div className='flex-grow-1 d-flex align-items-center justify-content-center py-4 px-3'>
                <div className='bg-white rounded-4 shadow-lg p-4 p-md-5' style={{ maxWidth: '450px', width: '100%' }}>

                    {/* Tabs */}
                    <div className='d-flex gap-2 mb-4'>
                        <button className={`btn flex-fill fw-semibold ${isLogin ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setIsLogin(true)}>
                            Login
                        </button>
                        <button className={`btn flex-fill fw-semibold ${!isLogin ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setIsLogin(false)}>
                            Register
                        </button>
                    </div>

                    {/* Login Form */}
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit}>
                            <p className='text-success text-center mb-1 fs-3 fw-bold'>Welcome Back!</p>
                            <p className='text-muted text-center mb-4'>Login to order fresh vegetables</p>

                            <div className='mb-3 col-md-8'>
                                <label className='form-label fw-semibold'>Email</label>
                                <div className='input-group'>
                                    <span className='input-group-text bg-success text-white'>
                                        <i className="bi bi-envelope-fill"></i>
                                    </span>

                                    <input type='email' className='form-control' name='email' placeholder='Enter your email'
                                        value={loginData.email} onChange={handleLoginChange} required />
                                </div>
                            </div>

                            <div className='mb-3 col-md-8'>
                                <label className='form-label fw-semibold'>Password</label>
                                <div className='input-group'>

                                    <span className='input-group-text bg-success text-white'>
                                        <i className="bi bi-lock-fill"></i>
                                    </span>

                                    <input type={showPassword ? 'text' : 'password'} className='form-control' name='password' placeholder='Enter your password'
                                        value={loginData.password} onChange={handleLoginChange} required />

                                    <span className='input-group-text bg-white' style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} text-secondary`}></i>
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2'>
                                <div className='form-check mt-1'>
                                    <input type='checkbox' className='form-check-input' id='rememberMe' />
                                    <label className='form-check-label text-muted' htmlFor='rememberMe'>Remember me</label>
                                </div>
                                <a href='#' className='text-success text-decoration-none'>Forgot Password?</a>
                            </div>

                            <button type='submit' className='btn btn-success w-100 py-2 fw-semibold mb-3'>
                                Login
                            </button>

                            <p className='text-center text-muted mb-0'>
                                Don't have an account?
                                <span className='text-success fw-semibold' style={{ cursor: 'pointer' }} onClick={() => setIsLogin(false)}> Register</span>
                            </p>
                        </form>
                    ) : (
                        /* Register Form */
                        <form onSubmit={handleRegisterSubmit}>
                            <p className='text-success text-center mb-1 fs-3 fw-bold'>Create Account</p>
                            <p className='text-muted text-center mb-4'>Join us for fresh vegetables</p>

                            <div className='mb-3 col-md-8'>
                                <label className='form-label fw-semibold'>Full Name</label>

                                <div className='input-group'>
                                    <span className='input-group-text bg-success text-white'>
                                        <i className="bi bi-person-fill"></i>
                                    </span>

                                    <input type='text' className='form-control' name='name' placeholder='Enter your name'
                                        value={registerData.name} onChange={handleRegisterChange} required />
                                </div>
                            </div>

                            <div className='mb-3 col-md-8'>
                                <label className='form-label fw-semibold'>Email</label>

                                <div className='input-group'>
                                    <span className='input-group-text bg-success text-white'>
                                        <i className="bi bi-envelope-fill"></i>
                                    </span>

                                    <input type='email' className='form-control' name='email' placeholder='Enter your email'
                                        value={registerData.email} onChange={handleRegisterChange} require />
                                </div>
                            </div>

                            <div className='mb-3 col-md-8'>
                                <label className='form-label fw-semibold'>Phone</label>

                                <PhoneInput country={'in'} value={registerData.phone} onChange={handlePhoneChange}
                                    inputStyle={{ width: '100%', height: '38px', fontSize: '16px', borderRadius: '10px' }}
                                    containerStyle={{ width: '100%' }} placeholder='Enter your phone' />
                            </div>

                            <div className='mb-4 col-md-8'>
                                <label className='form-label fw-semibold'>Password</label>

                                <div className='input-group'>
                                    <span className='input-group-text bg-success text-white'>
                                        <i className="bi bi-lock-fill"></i>
                                    </span>

                                    <input type={showPassword ? 'text' : 'password'} className='form-control' name='password' placeholder='Create a password'
                                        value={registerData.password} onChange={handleRegisterChange} required />

                                    <span className='input-group-text bg-white' style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} text-secondary`}></i>
                                    </span>
                                </div>
                            </div>

                            <button type='submit' className='btn btn-success w-100 py-2 fw-semibold mb-3'>
                                Register
                            </button>

                            <p className='text-center text-muted mb-0'>
                                Already have an account?
                                <span className='text-success fw-semibold' style={{ cursor: 'pointer' }} onClick={() => setIsLogin(true)}> Login</span>
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
