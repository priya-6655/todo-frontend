import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginNav() {
    const navigate = useNavigate()

    const backTodo = () => {
        navigate('/todo')
    }

    const handlelogout = () => {
        navigate('/')
    }
    return (
        <div>
            <div className='container-fluid py-3' style={{ backgroundColor: "rgba(212, 206, 207, 0.6)" }}>
                <div className='row align-items-center'>
                    <div className="col-2 col-md-2 d-flex justify-content-start ps-4">
                        <img src="https://www.freepnglogos.com/uploads/logo-home-png/photo-icon-home-logo-23.png"
                            alt="home" className="img-fluid" style={{ width: "50px", height: "40px", cursor: "pointer" }} onClick={backTodo} />
                    </div>

                    <div className="col-7 col-md-7 text-center">
                        <p className="fw-bold m-0 text-dark fs-3">Eagle Web Services</p>
                    </div>

                    <div className="col-3 col-md-3 text-end pe-4">
                        <span style={{ fontSize: "16px", cursor: "pointer" }} className="text-primary" onClick={handlelogout}>
                            Logout
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginNav


