import React from 'react';

function LandingFooter() {
    return (
        <>
            <footer className="container-fluid bg-dark text-light mt-5 pt-4 pb-3">
                <div className="row text-center text-md-start px-4">


                    <div className="col-12 col-md-4 mb-4">
                        <p className="fw-bold fs-4">ShopEase</p>
                        <p>Your one-stop platform for booking tickets, shopping groceries, dresses & more.</p>
                    </div>


                    <div className="col-6 col-md-2 mb-4">
                        <p className="fw-bold fs-4">Quick Links</p>
                        <ul className="list-unstyled">
                            <li><a className="text-light text-decoration-none" href="#">Home</a></li>
                            <li><a className="text-light text-decoration-none" href="#">About</a></li>
                            <li><a className="text-light text-decoration-none" href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-4">
                        <p className="fw-bold fs-4">Services</p>
                        <ul className="list-unstyled">
                            <li><a className="text-light text-decoration-none" href="#">Flight Booking</a></li>
                            <li><a className="text-light text-decoration-none" href="#">Movie Tickets</a></li>
                            <li><a className="text-light text-decoration-none" href="#">Grocery Shopping</a></li>
                        </ul>
                    </div>


                    <div className="col-12 col-md-4 mb-4">
                        <p className="fw-bold fs-4">Contact Us</p>
                        <p className="mb-1"><i className="fa-solid fa-envelope me-2"></i> support@shopease.com</p>
                        <p className="mb-1"><i className="fa-solid fa-phone me-2"></i> +91 98765 43210</p>
                        <div>
                            <i className="fa-brands fa-facebook fs-4 me-3"></i>
                            <i className="fa-brands fa-instagram fs-4 me-3"></i>
                            <i className="fa-brands fa-twitter fs-4"></i>
                        </div>
                    </div>
                </div>

                <hr />

                <p className="text-center m-0">
                    © {new Date().getFullYear()} ShopEase — All Rights Reserved.
                </p>
            </footer>
        </>
    );
}

export default LandingFooter;
