import React from 'react';
import LandingNav from './LandingNav';
import LandingFooter from './LandingFooter';

function LandingPage() {
    const carouselItems = [
        { img: 'https://png.pngtree.com/thumb_back/fw800/background/20231001/pngtree-d-rendered-image-booking-airline-tickets-online-with-calendar-for-tourism-image_13549511.png', caption: 'Book Your Flights' },
        { img: 'https://t3.ftcdn.net/jpg/02/59/31/70/360_F_259317013_nJJaBgGGzvXMd6cAyLd6yMJtbdnd61wk.jpg', caption: 'Create your todo list' },
        { img: 'https://vegease-marketing.s3.ap-south-1.amazonaws.com/marketing/LIVE/1742214078682_k5Azu.png', caption: 'Order our fresh vegetables' },
        { img: 'https://www.handover.in/wp-content/uploads/What-are-the-Benefits-of-Online-Grocery-Shopping-Handover.jpg', caption: 'Grab your groceries' },
        { img: 'https://www.lavanyathelabel.com/cdn/shop/articles/photo-collage.png_13_1.png?v=1741786181', caption: 'We have more collection of dresses' },
        { img: 'https://media.istockphoto.com/id/1401019613/photo/movie-tickets-online-booking-app.jpg?s=612x612&w=0&k=20&c=qre7CchnzXeLh72GXH3sOiPvNKX2aNoxEIHV1DM9lwI=', caption: 'Book Your Movies' }
    ];

    const ticketImages = [
        'https://img.freepik.com/free-vector/vintage-cinema-tickets-set_23-2147543251.jpg?semt=ais_hybrid&w=740&q=80',
        'https://cdn.dribbble.com/userupload/35194587/file/original-19331ea7b650d963d98d80360a8ada0e.jpg?format=webp&resize=400x300&vertical=center',
        'https://assets.indiadesire.com/images/Amazon%20Movie%20Ticket%20Booking%20Offers.jpg',
        'https://img.freepik.com/premium-vector/movie-tickets-online_118813-8545.jpg'
    ];

    const dressImages = [
        'https://anayadesignerstudio.com/cdn/shop/files/Party-Wear-Long-Dress-With-Dupatta-For-Women.jpg?v=1714620399',
        'https://ambraee.com/cdn/shop/files/JBL07377.jpg?v=1736702436&width=1080',
        'https://www.ordinaree.com/cdn/shop/files/DSC_8696.jpg?v=1756703522',
        'https://www.jaipuriadaah.com/cdn/shop/files/WhatsAppImage2025-11-20at1.38.49PM_1_600x.jpg?v=1763633832'
    ];

    return (
        <>
            <LandingNav />

            <div className="w-full">
                <div id="showOurServices" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {carouselItems.map((_, idx) => (
                            <button key={idx} type="button" data-bs-target="#showOurServices" data-bs-slide-to={idx} className={idx === 0 ? 'active' : ''}></button>
                        ))}
                    </div>

                    <div className="carousel-inner">
                        {carouselItems.map((item, idx) => (
                            <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                                <img src={item.img} className="block w-full h-[70vh] object-cover" alt={item.caption} />
                                <div className='carousel-caption'>
                                    <p className='text-xl md:text-2xl font-bold'>{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#showOurServices" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#showOurServices" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>


            <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mx-3 mt-4'>
                {ticketImages.map((img, idx) => (
                    <div key={idx} className='flex justify-center'>
                        <img src={img} alt={`ticket-${idx}`} className='w-full rounded-3xl object-cover hover:scale-105 transition-transform cursor-pointer' />
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mx-3 mt-5'>
                {dressImages.map((img, idx) => (
                    <div key={idx} className='flex justify-center'>
                        <img src={img} alt={`dress-${idx}`} className='w-full h-3/4 rounded-3xl object-cover hover:scale-105 transition-transform cursor-pointer' />
                    </div>
                ))}
            </div>

            <LandingFooter />
        </>
    );
}

export default LandingPage;
