import React, { useEffect, useState } from 'react';
import LandingFooter from '../LandingPage/LandingFooter';
import axios from 'axios';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import { useSelector } from 'react-redux';
import LoginNav from '../LoginAndReg/LoginNav';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://todo-backend-1-q0tf.onrender.com';

function EditProfile() {
    const [profile, setProfile] = useState({
        fname: '', lname: '', gender: '', phone: '', regUsername: '', regEmail: ''
    });
    const [isEditing, setISEditing] = useState(false)
    const [selectFile, setSelectFile] = useState(null)

    const { token, user } = useSelector(state => state.user)
    const userId = user?.id

    useEffect(() => {
        if (userId && token) {
            axios.get(`${API_URL}/register/getuser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => setProfile(res.data.data))
                .catch((err) => {
                    toast.warning(err.response?.data?.message || "You are unauthorized person")
                });
        }
    }, [userId, token]);

    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const handlephoneChange = (value) => setProfile({ ...profile, phone: value });
    const handleFile = (file) => setSelectFile(file);

    const handleSave = () => {
        const formData = new FormData()
        formData.append('fname', profile.fname)
        formData.append('lname', profile.lname)
        formData.append('gender', profile.gender)
        formData.append('phone', profile.phone)
        formData.append('regUsername', profile.regUsername)
        formData.append('regEmail', profile.regEmail)
        if (selectFile) formData.append('image', selectFile)

        axios.put(`${API_URL}/register/editprofile/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            toast.success("Profile updated successfully!")
            setISEditing(false)
        }).catch((err) => {

            if (err.response?.status === 401 || err.response?.status === 403) {
                toast.warning(err.response.data.message || "You are unauthorized person")
            } else {
                toast.error("Failed to update profile")
            }
        })
    }

    const previewImage = selectFile ? URL.createObjectURL(selectFile) : profile.image

    return (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            <LoginNav />

            <div className='flex-1 w-full max-w-2xl mx-auto px-4 py-8'>
                <p className='text-2xl font-bold text-center text-gray-800 mb-6'>Profile Details</p>


                <div className='flex flex-col items-center mb-8 relative'>
                    <label htmlFor='fileUpload' className='relative cursor-pointer group'>
                        {previewImage ? (
                            <img src={previewImage} className='w-32 h-32 rounded-full object-cover border-4 border-blue-500' alt='profile' />
                        ) : (
                            <i className="bi bi-person-circle text-8xl text-gray-400" onClick={() => !isEditing && toast.warning('Click "Edit Profile" button below first!')}></i>
                        )}
                        <div className='absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full group-hover:bg-blue-600 transition'>
                            <i className="bi bi-pencil-fill text-sm"></i>
                        </div>
                    </label>
                    <input id='fileUpload' type='file' accept='image/*' className='hidden'
                        onChange={(e) => handleFile(e.target.files[0])} disabled={!isEditing} />
                </div>

                <div className='space-y-4'>
                    <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
                        <label className='block font-semibold text-gray-700 mb-1 sm:w-1/3'>First Name</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 sm:w-2/3"
                            name="fname" value={profile.fname} onChange={handleChange} disabled={!isEditing} />
                    </div>

                    <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
                        <label className='block font-semibold text-gray-700 mb-1 sm:w-1/3'>Last Name</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 sm:w-2/3"
                            name="lname" value={profile.lname} onChange={handleChange} disabled={!isEditing} />
                    </div>

                    <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
                        <label className='block font-semibold text-gray-700 mb-1 sm:w-1/3'>Gender</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 sm:w-2/3"
                            name="gender" value={profile.gender} onChange={handleChange} disabled={!isEditing}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
                        <label className='block font-semibold text-gray-700 mb-1 sm:w-1/3'>Phone</label>
                        <div className='w-full sm:w-2/3'>
                            <PhoneInput country={'in'} value={profile.phone} onChange={handlephoneChange} disabled={!isEditing}
                                inputStyle={{ width: '100%', height: '48px', borderRadius: '8px' }} />
                        </div>
                    </div>

                    <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
                        <label className='block font-semibold text-gray-700 mb-1 sm:w-1/3'>Username</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 sm:w-2/3"
                            name="regUsername" value={profile.regUsername} onChange={handleChange} disabled={!isEditing} />
                    </div>

                    <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
                        <label className='block font-semibold text-gray-700 mb-1 sm:w-1/3'>Email</label>
                        <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 sm:w-2/3"
                            name="regEmail" value={profile.regEmail} onChange={handleChange} disabled={!isEditing} />
                    </div>
                </div>

                <div className='mt-8 flex justify-center'>
                    <button
                        className='px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition w-full md:w-1/2'
                        type='button'
                        onClick={isEditing ? handleSave : () => setISEditing(!isEditing)}
                    >
                        {isEditing ? "Update" : "Edit Profile"}
                    </button>
                </div>
            </div>

            <LandingFooter />
        </div>
    );
}

export default EditProfile;
