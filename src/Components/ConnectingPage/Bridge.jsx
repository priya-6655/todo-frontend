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
                <p className='fs-4 fw-bold'>Choose an Option</p>

                <div className='d-flex align-items-center justify-content-center' style={{ marginTop: '150px' }}>
                    <div className="col-12 col-sm-6 col-md-3 mb-5">
                        <button onClick={() => handleNavigate('/flight')} className="btn btn-primary">Book Flight</button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 mb-5 ">
                        <button onClick={() => handleNavigate('/groceries')} className="btn btn-success">Order Veg & Groceries</button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 mb-5">
                        <button onClick={() => handleNavigate('/shop-dress')} className="btn btn-warning">Shop Dress</button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 mb-5">
                        <button onClick={() => handleNavigate('/todo')} className="btn btn-info">Todo Creation</button>
                    </div>
                </div>
            </div>
            <LandingFooter />
        </>
    );
}

export default Bridge;
