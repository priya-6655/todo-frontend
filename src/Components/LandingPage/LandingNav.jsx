import React, { useState } from 'react'
import './LandingNav.css'
import { useNavigate } from 'react-router-dom'

function LandingNav() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const openLogin = () => {
        navigate('/login')
    }

    const openVegPage = () => {
        navigate('/orderVeg')
    }
    return (
        <>
            <nav className='landing_Nav_back'>
                <div className='nav-logo-container' onClick={() => setOpen(!open)}>
                    <img src='https://www.nicepng.com/png/full/321-3210180_professional-blank-logo-png-free-download-logo-red.png' alt='nav_Logo' className='navLogo' />
                    <i className="bi bi-three-dots-vertical mobile-menu-icon"></i>
                </div>

                <div className='Nav-Menu'>
                    <div className='Nav-Item'>
                        <img src='https://cdn-icons-png.flaticon.com/512/9137/9137943.png' alt='tickets' className='Nav_image' />
                        <span>Book my tickets</span>
                    </div>
                    <div className='Nav-Item' onClick={openLogin}>
                        <img src='https://cdn-icons-png.freepik.com/256/8476/8476658.png?semt=ais_white_label' alt='todo' className='Nav_image' />
                        <span>Todo App</span>
                    </div>
                    <div className='Nav-Item' onClick={openVegPage}>
                        <img src='https://www.pngplay.com/wp-content/uploads/8/Vegetable-Collection-Transparent-Free-PNG.png' alt='veg' className='Nav_image' />
                        <span>Our freshes</span>
                    </div>
                    <div className='Nav-Item'>
                        <img src='https://png.pngtree.com/png-clipart/20240428/original/pngtree-grocery-basket-and-a-list-of-products-png-image_14956705.png' alt='groceries' className='Nav_image' />
                        <span>Groceries</span>
                    </div>
                    <div className='Nav-Item'>
                        <img src='https://purepng.com/public/uploads/large/purepng.com-women-dressfashion-women-dress-cloth-apparelclothingwomen-dress-631522326940onrfa.png' alt='dress' className='Nav_image' />
                        <span>Dress collections</span>
                    </div>
                </div>

                <input type='search' id='search-item' className='form-input' />

                <div className='nav-icons'>
                    <i className="bi bi-cart cart-style"></i>
                    <i className="bi bi-person-circle cart-style"></i>
                </div>

                <div className='verticalNav'>
                    <div className={`mobile-menu ${open ? 'show-menu' : ''}`}>
                        <div className='mobile-Nav-Item' onClick={() => setOpen(false)}>Book my tickets</div>
                        <div className='mobile-Nav-Item' onClick={() => setOpen(false)}>Todo App</div>
                        <div className='mobile-Nav-Item' onClick={() => setOpen(false)}>Our freshes</div>
                        <div className='mobile-Nav-Item' onClick={() => setOpen(false)}>Groceries</div>
                        <div className='mobile-Nav-Item' onClick={() => setOpen(false)}>Dress collections</div>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default LandingNav
