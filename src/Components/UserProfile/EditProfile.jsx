import React, { useEffect, useState, useRef } from 'react';
import HeaderCom from '../ConnectingPage/HeaderCom';
import LandingFooter from '../LandingPage/LandingFooter';
import axios from 'axios';
import './EditProfile.css'

const API_URL = import.meta.env.VITE_API_URL || 'https://todo-backend-1-q0tf.onrender.com';

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
    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem('profileImage') || null;
    });
    const fileInputRef = useRef(null);

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

    const handleProfileClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('profileImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <HeaderCom />

            <div className='container mt-4'>
                <p className='mb-3 fs-4 text-center fw-bold text-dark'>Profile Details</p>

                <div className='profile-image-container' onClick={handleProfileClick}>
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                        <i className="bi bi-person-circle profile-icon"></i>
                    )}
                    <div className="edit-icon-wrapper">
                        <i className="bi bi-camera-fill edit-icon"></i>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fname"
                        value={profile.fname}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lname"
                        value={profile.lname}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Gender</label>
                    <select
                        className="form-select"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        disabled
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="regUsername"
                        value={profile.regUsername}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className='mb-3'>
                    <label className='fw-semibold'>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="regEmail"
                        value={profile.regEmail}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className='col-sm-5 col-md-12 d-flex justify-content-center'>
                    <button className='btn btn-info w-50' type='button'>Edit Profile</button>
                </div>
            </div>

            <LandingFooter />
        </div>
    );
}

export default EditProfile;
