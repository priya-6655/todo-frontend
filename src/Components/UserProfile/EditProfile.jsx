import React, { useEffect, useState } from 'react';
import HeaderCom from '../ConnectingPage/HeaderCom';
import LandingFooter from '../LandingPage/LandingFooter';
import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'https://todo-backend-beta-two.vercel.app';

const API_URL = 'http://localhost:3000';

function EditProfile() {
    const [profile, setProfile] = useState({
        fname: '',
        lname: '',
        gender: '',
        phone: '',
        regUsername: '',
        regEmail: ''
    });

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

    return (
        <div>
            <HeaderCom />

            <div className='container mt-4'>
                <p className='mb-3 fs-4 text-center fw-bold'>Profile Details</p>

                <div className='mb-3'>
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fname"
                        value={profile.fname}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lname"
                        value={profile.lname}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label>Gender</label>
                    <select
                        className="form-select"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='mb-3'>
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="regUsername"
                        value={profile.regUsername}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="regEmail"
                        value={profile.regEmail}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <LandingFooter />
        </div>
    );
}

export default EditProfile;
