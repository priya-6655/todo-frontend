import React, { useState } from 'react'
import LoginHeader from './LoginHeader'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import LandingFooter from '../LandingPage/LandingFooter';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://todo-backend-1-q0tf.onrender.com';
//const API_URL = 'http://localhost:3000';


function Login() {
    const [regBox, setRegBox] = useState(false)
    const [regData, setRegData] = useState({ fname: '', lname: "", gender: "", phone: "", regUsername: "", regEmail: "", regPass: "" })
    const [logData, setLogData] = useState({ userName: "", pass: "" })
    const navigate = useNavigate()
    const [viewPassword, setViewPassword] = useState(false)
    const [viewRegPass, setViewRegPass] = useState(false)

    const viewPass = () => {
        setViewPassword(!viewPassword)
    }

    const handleRegPass = () => {
        setViewRegPass(!viewRegPass)
    }

    const handleReg = (e) => {
        e.preventDefault()
        setRegBox(true)
    }

    const handleLog = (e) => {
        e.preventDefault()
        setRegBox(false)
    }

    const handleRegChange = (e) => {
        setRegData({
            ...regData,
            [e.target.id]: e.target.value
        })
    }

    const handleRegPhone = (value) => {
        setRegData({
            ...regData,
            phone: value
        })
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
        setLogData({
            ...logData,
            [e.target.id]: e.target.value
        })
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
                localStorage.setItem("userId", data.data.id);
                localStorage.setItem("username", data.data.username);
                console.log("Logged in user:", data.data);
                navigate('/bridge')
            }

        } catch (error) {
            console.error("Error:", error);
            toast.error("Server error. Try again later.");
        }
    };

    return (
        <div className='login-page-wrapper'>
            <LoginHeader />
            <div className='login-content'>
                {!regBox && (
                    <form onSubmit={handleLogin}>
                        <div className='form-box shadow-lg'>
                            <p className='fs-4 fw-bold text-success text-decoration-underline text-center'>Login</p>

                            <div className='row mb-3'>
                                <label htmlFor='username' className='col-sm-3 col-form-label text-light fw-bold'>Email</label>
                                <div className='col-sm-8'>
                                    <input type='text' id='userName' className='col-sm-6 fw-bold form-control' placeholder='Enter your email' value={logData.userName} onChange={handleLogData} />
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label htmlFor='pass' className='col-sm-3 col-form-label text-light fw-bold'>Password</label>
                                <div className='col-sm-8 position-relative'>
                                    <input type={viewPassword ? "text" : "password"} id='pass' className='col-sm-6 fw-bold form-control' placeholder='Enter your password' value={logData.pass} onChange={handleLogData} />
                                    <i className={viewPassword ? "bi bi-eye-slash-fill" : "bi-eye-fill"} style={{ top: '20%', right: '10%', cursor: 'pointer', position: "absolute" }} onClick={viewPass}></i>
                                </div>
                            </div>

                            <div className='row mb-3 text-center'>
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success fw-bold w-25'>Login</button>
                                </div>
                            </div>

                            <div className='row mb-3 text-center'>
                                <div className='col-12'>
                                    <span className='text-light'>
                                        Don't have an account? <a href='#' className='text-warning text-decoration-none' onClick={handleReg}>Register</a>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </form>
                )}

                {regBox && (
                    <div className='form-box shadow-lg'>
                        <p className='fs-4 fw-bold text-primary text-decoration-underline text-center'>Register</p>

                        <div className='row mb-3'>
                            <label htmlFor='fname' className='col-sm-3 col-form-label fw-bold text-light'>First Name</label>
                            <div className='col-sm-8'>
                                <input type='text' id='fname' className='col-sm-6 fw-bold form-control' placeholder='Enter your first name' value={regData.fname} onChange={handleRegChange} />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label htmlFor='lname' className='col-sm-3 col-form-label fw-bold text-light'>Last Name</label>
                            <div className='col-sm-8'>
                                <input type='text' id='lname' className='col-sm-6 fw-bold form-control' placeholder='Enter your last name' value={regData.lname} onChange={handleRegChange} />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label htmlFor='gender' className='col-sm-3 col-form-label fw-bold text-light'>Gender</label>
                            <div className='col-sm-8'>
                                <select id='gender' className='col-sm-6 fw-bold form-select' value={regData.gender} onChange={handleRegChange}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label htmlFor='phone' className='col-sm-3 col-form-label fw-bold text-light'>Phone</label>
                            <div className='col-sm-8'>
                                {/* <input type='tel' id='phone' className='col-sm-6 fw-bold form-control' placeholder='Enter your phone number' value={regData.phone} onChange={handleRegChange} /> */}
                                <PhoneInput country={'in'} value={regData.phone} onChange={handleRegPhone} placeholder='Enter your phone number' inputStyle={{ width: '500px', fontSize: '16px', borderRadius: '15px' }} />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label htmlFor='regUsername' className='col-sm-3 col-form-label text-light fw-bold'>User Name</label>
                            <div className='col-sm-8'>
                                <input type='text' id='regUsername' className='col-sm-6 fw-bold form-control' placeholder='Enter your username' value={regData.regUsername} onChange={handleRegChange} />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label htmlFor='regEmail' className='col-sm-3 col-form-label text-light fw-bold'>Email</label>
                            <div className='col-sm-8'>
                                <input type='email' id='regEmail' className='col-sm-6 fw-bold form-control' placeholder='Enter your email' value={regData.regEmail} onChange={handleRegChange} />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label htmlFor='regPass' className='col-sm-3 col-form-label text-light fw-bold'>Password</label>
                            <div className='col-sm-8 position-relative'>
                                <input type={viewRegPass ? "text" : "password"} id='regPass' className='col-sm-6 fw-bold form-control' placeholder='Enter your password' value={regData.regPass} onChange={handleRegChange} />
                                <i className={viewRegPass ? "bi bi-eye-slash-fill" : "bi-eye-fill"} style={{ bottom: '15%', right: '10%', cursor: 'pointer', position: "absolute" }} onClick={handleRegPass}></i>
                            </div>
                        </div>

                        <div className='row mb-3 text-center'>
                            <div className='col-12'>
                                <button type='button' className='btn btn-primary fw-bold w-50' onClick={handleRegister}>Register</button>
                            </div>
                        </div>

                        <div className='row mb-3 text-center'>
                            <div className='col-12'>
                                <span className='text-light'>
                                    If have an account? <a href='#' className='text-warning text-decoration-none' onClick={handleLog}>Login</a>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <LandingFooter />
        </div>
    )
}

export default Login
