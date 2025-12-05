import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginHeader() {
    const navigate = useNavigate()

    const backtoHome = () => {
        navigate('/')
    }
    return (
        <>
            <div className='container-fluid py-3' style={{ backgroundColor: "rgba(212, 206, 207, 0.6)" }}>
                <div className='row align-items-center'>
                    <div className="col-4 col-md-3 d-flex justify-content-start ps-4">
                        <img src="https://www.freepnglogos.com/uploads/logo-home-png/photo-icon-home-logo-23.png"
                            alt="home" className="img-fluid" style={{ width: "50px", height: "40px", cursor: "pointer" }} onClick={backtoHome} />
                    </div>

                    <div className="col-4 col-md-6 text-center">
                        <p className="fw-bold m-0 text-dark fs-5">Eagle Multi Web Services</p>
                    </div>

                    <div className="col-4 col-md-3 text-end pe-4">
                        <span style={{ fontSize: "16px", cursor: "pointer" }} className="text-primary">
                            Need Help?
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginHeader
