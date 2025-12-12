import React from 'react';

function LandingFooter() {
    return (
        <>
            <footer className="w-full bg-black/80 text-white mt-5 pt-4 pb-3">
                <div className="flex flex-wrap text-center sm:text-left px-4">


                    <div className="md:w-1/3 w-full mb-4">
                        <p className="font-bold text-2xl">ShopEase</p>
                        <p>Your one-stop platform for booking tickets, shopping groceries, dresses & more.</p>
                    </div>


                    <div className="w-1/2 md:w-1/6 mb-4">
                        <p className="font-bold text-2xl">Quick Links</p>
                        <ul className="list-none p-0">
                            <li><a className="text-white-200 no-underline" href="#">Home</a></li>
                            <li><a className="text-white-200 no-underline" href="#">About</a></li>
                            <li><a className="text-white-200 no-underline" href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div className="w-1/2 md:w-1/6 mb-4">
                        <p className="font-bold text-2xl">Services</p>
                        <ul className="list-none p-0">
                            <li><a className="text-white-200 no-underline" href="#">Flight Booking</a></li>
                            <li><a className="text-white-200 no-underline" href="#">Movie Tickets</a></li>
                            <li><a className="text-white-200 no-underline" href="#">Grocery Shopping</a></li>
                        </ul>
                    </div>


                    <div className="w-full md:w-1/3 mb-4">
                        <p className="font-bold text-2xl">Contact Us</p>
                        <p className="mb-1"><i className="fa-solid fa-envelope me-2"></i> support@shopease.com</p>
                        <p className="mb-1"><i className="fa-solid fa-phone me-2"></i> +91 98765 43210</p>

                        <div className="flex justify-center sm:justify-start gap-4 text-2xl">
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-twitter"></i>
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
