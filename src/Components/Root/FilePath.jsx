import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import Login from '../LoginAndReg/Login'
import Bridge from '../ConnectingPage/Bridge'
import MainPage from '../MainPage'
import EditProfile from '../UserProfile/EditProfile'

function FilePath() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/bridge' element={<Bridge />} />
                <Route path='/todo' element={<MainPage />} />
                <Route path='/userprofile' element={<EditProfile />} />
            </Routes>
        </div>
    )
}

export default FilePath
