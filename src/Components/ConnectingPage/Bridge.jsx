import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCom from './HeaderCom';
import LandingFooter from '../LandingPage/LandingFooter';
import './Bridge.css'

function Bridge() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <HeaderCom />
            <div className="container-fluid optionTheme" style={{ textAlign: 'center' }}>
                <p className='fs-4 fw-bold mt-5 text-decoration-underline mb-5'>Choose an Option</p>

                <div className='row justify-content-center' style={{ marginTop: '150px' }}>
                    <div className="col-12 col-sm-6 col-md-3 mb-5 d-flex justify-content-center">
                        <button onClick={() => handleNavigate('/flight')} className="btn btn-primary w-50 rounded-5">Book Flight</button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 mb-5 d-flex justify-content-center ">
                        <button onClick={() => handleNavigate('/groceries')} className="btn btn-success w-50 rounded-5">Order Veg & Groceries</button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 mb-5 d-flex justify-content-center">
                        <button onClick={() => handleNavigate('/shop-dress')} className="btn btn-warning w-50 rounded-5">Shop Dress</button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 mb-5 d-flex justify-content-center">
                        <button onClick={() => handleNavigate('/todo')} className="btn btn-info w-50 rounded-5">Todo Creation</button>
                    </div>
                </div>
            </div>
            <LandingFooter />
        </>
    );
}

export default Bridge;
