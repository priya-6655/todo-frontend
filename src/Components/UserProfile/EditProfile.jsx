import React, { useEffect, useState } from 'react';
import HeaderCom from '../ConnectingPage/HeaderCom';
import LandingFooter from '../LandingPage/LandingFooter';
import axios from 'axios';
import './EditProfile.css'
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://todo-backend-1-q0tf.onrender.com';

//const API_URL = 'http://localhost:3000';

function EditProfile() {
    const [profile, setProfile] = useState({
        fname: '',
        lname: '',
        gender: '',
        phone: '',
        regUsername: '',
        regEmail: ''
    });
    const [isEditing, setISEditing] = useState(false)
    const [selectFile, setSelectFile] = useState(null)


    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (userId) {
            axios.get(`${API_URL}/register/getuser/${userId}`)
                .then(res => setProfile(res.data.data))
                .catch(err => console.log(err));
        }
    }, [userId]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handlephoneChange = (value) => {
        setProfile({
            ...profile,
            phone: value
        })
    }

    const handleFile = (file) => {
        setSelectFile(file)
    }

    const handleSave = () => {
        const formData = new FormData()

        formData.append('fname', profile.fname)
        formData.append('lname', profile.lname)
        formData.append('gender', profile.gender)
        formData.append('phone', profile.phone)
        formData.append('regUsername', profile.regUsername)
        formData.append('regEmail', profile.regEmail)

        if (selectFile) {
            formData.append('image', selectFile)
        }
        axios.put(`${API_URL}/register/editprofile/${userId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(() => {
                toast.success("Profile updated successfully!")
                setISEditing(false)
            })
            .catch(() => {
                toast.error("Failed to update profile")
            })
    }

    const previewImage = selectFile ? URL.createObjectURL(selectFile) : profile.image

    return (
        <div>
            <HeaderCom />

            <div className='container mt-4'>
                <p className='mb-3 fs-4 text-center fw-bold text-dark'>Profile Details</p>

                <div className='profile-container'>
                    <label htmlFor='fileUpload'>
                        {previewImage ? (
                            <img src={previewImage} className='profile-preview' alt='profile' />
                        ) : (
                            <i className="bi bi-person-circle profile-icon" onClick={() => !isEditing && toast.warning('Click "Edit Profile" button below first!')}></i>
                        )}
                    </label>

                    <input id='fileUpload' type='file' accept='image/*' style={{ display: "none" }}
                        onChange={(e) => handleFile(e.target.files[0])} disabled={!isEditing} />

                    <i className="bi bi-pencil-fill edit-icon"></i>
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>First Name</label>
                    <input type="text" className="form-control" name="fname"
                        value={profile.fname} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Last Name</label>
                    <input type="text" className="form-control" name="lname"
                        value={profile.lname} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Gender</label>
                    <select className="form-select" name="gender"
                        value={profile.gender} onChange={handleChange} disabled={!isEditing}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Phone</label>
                    {/* <input type="text" className="form-control" name="phone"
                        value={profile.phone} onChange={handleChange} disabled={!isEditing} /> */}
                    <PhoneInput country={'in'} value={profile.phone} onChange={handlephoneChange} disabled={!isEditing} inputStyle={{ width: '650px' }} />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Username</label>
                    <input type="text" className="form-control" name="regUsername"
                        value={profile.regUsername} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Email</label>
                    <input type="email" className="form-control" name="regEmail"
                        value={profile.regEmail} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className='col-sm-5 col-md-12 d-flex justify-content-center'>
                    <button className='btn btn-info w-50' type='button' onClick={isEditing ? handleSave : () => setISEditing(!isEditing)}>
                        {isEditing ? "Update" : "Edit Profile"}
                    </button>
                </div>
            </div>

            <LandingFooter />
        </div>
    );
}

export default EditProfile;
