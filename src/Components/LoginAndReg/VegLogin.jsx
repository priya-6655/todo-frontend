import React, { useState } from 'react'
import LoginHeader from '../ResuseComponent/LoginHeader'
import LandingFooter from '../LandingPage/LandingFooter'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'
import { useDispatch } from 'react-redux'
import { setUsr } from '../Redux/Reducer/VegorderSlice'
import vegLoginApi from '../feature/api/vegLoginApi'


function VegLogin() {
    const [isLogin, setIsLogin] = useState(true)
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '+91', password: '', retypePass: '', age: '' })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleLoginChange = (e) => setLoginData({
        ...loginData, [e.target.name]: e.target.value
    })


    const handleRegisterChange = (e) => setRegisterData({
        ...registerData, [e.target.name]: e.target.value
    })

    const emailRegex = /^[a-zA-z0-9-._]+@+[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/


    const indianNum = /^\+91[6-9]\d{9}$/

    const ageRegex = /^\d*$/


    const handlephoneChange = (e) => {
        let val = e.target.value

        if (!val.startsWith('+91')) {
            val = '+91'
        }

        const digit = val.replace(/\D/g, '').slice(0, 12)

        setRegisterData({
            ...registerData,
            phone: '+' + digit
        })
    }


    const handleAgeKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault()
            return
        }

    }

    const handleAgeChange = (e) => {
        let ageVal = e.target.value

        if (!ageRegex.test(ageVal)) return

        if (ageVal.length > 2) {
            toast.warning("Invalid age!")
            return
        }

        setRegisterData({
            ...registerData,
            age: ageVal
        })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        if (!emailRegex.test(loginData.email)) {
            toast.warning('Please enter a valid email')
            return
        }

        try {
            const result = await vegLoginApi.vegLogin(loginData)

            const { response, data } = result

            if (!response.ok) {
                toast.warning(data.message || 'Login failed')
            } else {
                toast.success('Login Successful!')
                dispatch(setUsr({
                    user: data.data.user,
                    token: data.data.token,
                    loginStatus: data.data.loginStatus
                }))
                navigate('/orderVeg')
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error('Server error. Try again later.')
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        if (!emailRegex.test(registerData.email)) {
            toast.warning('Please enter a valid email')
            return
        }

        if (!indianNum.test(registerData.phone)) {
            toast.warning('Indian number only allowed!')
            return
        }

        try {
            const result = await vegLoginApi.vegRegister(registerData)
            const { response, data } = result

            if (registerData.password !== registerData.retypePass) {
                toast.warning('Password mismatched!')
                return
            }

            if (!response.ok) {
                toast.warning(data.message)
            } else {
                toast.success('Registration successfull!')
                setIsLogin(true)
                setRegisterData({
                    name: '',
                    email: '',
                    phone: '+91',
                    password: '',
                    retypePass: '',
                    age: ''
                })
            }
        } catch (error) {
            console.error(error);
            toast.error('Server error. Try again later.');
        }
    }

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-green-100 to-green-200'>
            <LoginHeader />

            <div className='flex-1 flex items-center justify-center py-4 px-3'>
                <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md'>


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

                        <form onSubmit={handleRegisterSubmit}>
                            <p className='text-green-600 text-center text-2xl font-bold mb-1'>Create Account</p>
                            <p className='text-gray-500 text-center mb-6'>Join us for fresh vegetables</p>

                            <div className='mb-4'>
                                <label className='block font-semibold mb-2'>Full Name</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-person-fill"></i>
                                    </span>
                                    <input type='text' className='flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='name' placeholder='Enter your name' value={registerData.name}
                                        onChange={handleRegisterChange} required />
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className='block font-semibold mb-2'>Email</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-envelope-fill"></i>
                                    </span>
                                    <input type='email' className='flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='email' placeholder='Enter your email' value={registerData.email}
                                        onChange={handleRegisterChange} required />
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className='block font-semibold mb-2'>Phone</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="fa-solid fa-phone"></i>
                                    </span>
                                    <input type='tel' className='flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='phone' placeholder='Enter your phone number' value={registerData.phone}
                                        onChange={handlephoneChange} required maxLength={15} />
                                </div>
                            </div>

                            <div className='mbb-4'>
                                <label className='block font-semibold mb-2'>Age</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="fa-solid fa-circle-user"></i>
                                    </span>
                                    <input type='number' className='flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:border-green-500
                                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' name='age'
                                        placeholder='Enter your age' onChange={handleAgeChange} value={registerData.age} required
                                        onKeyDown={handleAgeKeyDown} />
                                </div>
                            </div>

                            <div className='mb-6'>
                                <label className='block font-semibold mb-2'>Password</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-lock-fill"></i>
                                    </span>

                                    <input type={showPassword ? 'text' : 'password'} className='flex-1 border-y border-gray-300 px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='password' placeholder='Create a password' value={registerData.password}
                                        onChange={handleRegisterChange} required />
                                    <span className='bg-white border border-gray-300 px-3 py-2 rounded-r-lg flex items-center cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)}>
                                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} text-gray-500`}></i>
                                    </span>
                                </div>
                            </div>

                            <div className='mb-6'>
                                <label className='block font-semibold mb-2'>Re-type Password</label>
                                <div className='flex'>
                                    <span className='bg-green-600 text-white px-3 py-2 rounded-l-lg flex items-center'>
                                        <i className="bi bi-lock-fill"></i>
                                    </span>

                                    <input type={showPassword ? 'text' : 'password'} className='flex-1 border-y border-gray-300 px-3 py-2 focus:outline-none focus:border-green-500'
                                        name='retypePass' placeholder='Create a password' value={registerData.retypePass}
                                        onChange={handleRegisterChange} required />
                                    <span className='bg-white border border-gray-300 px-3 py-2 rounded-r-lg flex items-center cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)}>
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
            </div >

            <LandingFooter />
        </div >
    )
}

export default VegLogin
