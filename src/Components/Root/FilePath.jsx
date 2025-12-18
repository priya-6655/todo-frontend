import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import Login from '../LoginAndReg/Login'
import MainPage from '../todoPage/MainPage'
import EditProfile from '../UserProfile/EditProfile'
import VegLogin from '../LoginAndReg/VegLogin'
import VegPage from '../orderVegetable/VegPage'

function FilePath() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/todo' element={<MainPage />} />
                <Route path='/userprofile' element={<EditProfile />} />
                <Route path='/veglogin' element={<VegLogin />} />
                <Route path='/orderVeg' element={<VegPage />} />
            </Routes>
        </div>
    )
}

export default FilePath
