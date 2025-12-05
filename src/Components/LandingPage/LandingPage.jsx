import React from 'react';
import LandingNav from './LandingNav';
import LandingFooter from './LandingFooter';

function LandingPage() {
    return (
        <>
            <LandingNav />
            <div className="container-fluid mt-3">

                <div id="showOurServices" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#showOurServices" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#showOurServices" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#showOurServices" data-bs-slide-to="2"></button>
                        <button type="button" data-bs-target="#showOurServices" data-bs-slide-to="3"></button>
                        <button type="button" data-bs-target="#showOurServices" data-bs-slide-to="4"></button>
                        <button type="button" data-bs-target="#showOurServices" data-bs-slide-to="5"></button>
                    </div>


                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://media.istockphoto.com/id/626867464/photo/booking-flight-travel-traveler-search-reservation-holiday-page.jpg?s=612x612&w=0&k=20&c=8I9qa7CjVELa_Wof5z1I1r2QL6208_VnUwNIsH1_5Rk=" className="d-block w-100" alt="flight ticket" />
                            <div className='carousel-caption'>
                                <h3>Book Your Flights</h3>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="https://t3.ftcdn.net/jpg/02/59/31/70/360_F_259317013_nJJaBgGGzvXMd6cAyLd6yMJtbdnd61wk.jpg" className="d-block w-100" alt="todo list" />
                            <div className='carousel-caption'>
                                <h3>Create your todo list</h3>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="https://vegease-marketing.s3.ap-south-1.amazonaws.com/marketing/LIVE/1742214078682_k5Azu.png" className="d-block w-100" alt="vegetables" />
                            <div className='carousel-caption'>
                                <h3>Order our fresh vegetables</h3>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="https://www.handover.in/wp-content/uploads/What-are-the-Benefits-of-Online-Grocery-Shopping-Handover.jpg" className="d-block w-100" alt="groceries" />
                            <div className='carousel-caption'>
                                <h3>Grap your groceries</h3>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="https://www.lavanyathelabel.com/cdn/shop/articles/photo-collage.png_13_1.png?v=1741786181" className="d-block w-100" alt="dress" />
                            <div className='carousel-caption'>
                                <h3>We have more correction of dresses</h3>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="https://media.istockphoto.com/id/1401019613/photo/movie-tickets-online-booking-app.jpg?s=612x612&w=0&k=20&c=qre7CchnzXeLh72GXH3sOiPvNKX2aNoxEIHV1DM9lwI=" className="d-block w-100" alt="movie tickets" />
                            <div className='carousel-caption'>
                                <h3>Book Your Movies</h3>
                            </div>
                        </div>
                    </div>


                    <button className="carousel-control-prev" type="button" data-bs-target="#showOurServices" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#showOurServices" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>

            <div className='row gy-3 mt-5 mx-3'>
                <div className='col-6 col-lg-3 d-flex justify-content-center'>
                    <img src='https://img.freepik.com/free-vector/vintage-cinema-tickets-set_23-2147543251.jpg?semt=ais_hybrid&w=740&q=80' className='img-fluid rounded-5 w-100' />
                </div>

                <div className='col-6 col-lg-3 d-flex justify-content-center'>
                    <img src='https://cdn.dribbble.com/userupload/35194587/file/original-19331ea7b650d963d98d80360a8ada0e.jpg?format=webp&resize=400x300&vertical=center' alt='flight' className='img-fluid rounded-5 w-100' />
                </div>

                <div className='col-6 col-lg-3 d-flex justify-content-center'>
                    <img src='https://assets.indiadesire.com/images/Amazon%20Movie%20Ticket%20Booking%20Offers.jpg' alt='flight' className='img-fluid rounded-5 w-100' />
                </div>

                <div className='col-6 col-lg-3 d-flex justify-content-center'>
                    <img src='https://img.freepik.com/premium-vector/movie-tickets-online_118813-8545.jpg' alt='flight' className='img-fluid rounded-5 w-100' />
                </div>
            </div>

            <div className='row gy-3 mt-5 mx-3'>
                <div className='col-6 col-lg-3 d-flex justify-content-center'>
                    <img src='https://anayadesignerstudio.com/cdn/shop/files/Party-Wear-Long-Dress-With-Dupatta-For-Women.jpg?v=1714620399' className='img-fluid rounded-5 w-100 h-75' />
                </div>

                <div className='col-6 col-lg-3 d-flex justify-content-center'>
                    <img src='https://ambraee.com/cdn/shop/files/JBL07377.jpg?v=1736702436&width=1080' alt='flight' className='img-fluid rounded-5 w-100 h-75' />
                </div>

                <div className='col-6 col-lg-3 d-flex justify-content-center'>
                    <img src='https://www.ordinaree.com/cdn/shop/files/DSC_8696.jpg?v=1756703522' alt='flight' className='img-fluid rounded-5 w-100 h-75' />
                </div>

                <div className='col-6 col-lg-3 d-flex justify-content-center'>
                    <img src='https://www.jaipuriadaah.com/cdn/shop/files/WhatsAppImage2025-11-20at1.38.49PM_1_600x.jpg?v=1763633832' alt='flight' className='img-fluid rounded-5 w-100 h-75' />
                </div>
            </div>

            <LandingFooter />
        </>
    );
}

export default LandingPage;
