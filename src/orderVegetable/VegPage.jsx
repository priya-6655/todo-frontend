import React from 'react'
import HeaderCom from '../Components/ConnectingPage/HeaderCom'
import LandingFooter from '../Components/LandingPage/LandingFooter'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function VegPage() {
    const { token } = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleAddToCard = () => {
        if (!token) {
            toast.warning("You must login to order vegetables!")
            setTimeout(() => navigate('/veglogin'), 800);
            return
        }
    }

    const vegetables = [
        { id: 1, name: 'Fresh Carrots', price: '₹40/kg', image: 'https://www.jiomart.com/images/product/original/590000186/carrot-orange-500-g-product-images-o590000186-p590000186-0-202409171905.jpg?im=Resize=(1000,1000)' },
        { id: 2, name: 'Organic Beans', price: '₹35/kg', image: 'https://freshindiaorganics.com/cdn/shop/files/Untitleddesign_26.png?v=1686981937' },
        { id: 3, name: 'Green Cabbage', price: '₹30/pc', image: 'https://www.jiomart.com/images/product/original/590003538/cabbage-per-pc-approx-600-g-1000-g-product-images-o590003538-p590003538-0-202408070949.jpg?im=Resize=(1000,1000)' },
        { id: 4, name: 'Fresh Beetroot', price: '₹45/kg', image: 'https://cdn2.stylecraze.com/wp-content/uploads/2013/04/Important-Health-Benefits-Of-Beetroot.jpg.webp' },
        { id: 5, name: 'Fresh Tomato', price: '₹25/bunch', image: 'https://img.freepik.com/premium-photo/fresh-tomato-basket_219717-5702.jpg' },
        { id: 6, name: 'Fresh Potatoes', price: '₹35/kg', image: 'https://www.simplotfoods.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2FRKiZ605RAV8kjDQnxFCWP%2Fb03b8729817c90b29b88d536bfd37ac5%2F9-Unusual-Uses-For-Potatoes.jpg%3Ffm%3Dwebp&w=1920&q=75' },
        { id: 7, name: 'Green Capsicum', price: '₹50/kg', image: 'https://www.jiomart.com/images/product/original/590003662/green-capsicum-500-g-product-images-o590003662-p590003662-0-202408132028.jpg?im=Resize=(1000,1000)' },
        { id: 8, name: 'Fresh Onions', price: '₹40/kg', image: 'https://www.jiomart.com/images/product/original/590003515/onion-1-kg-product-images-o590003515-p590003515-0-202511020955.jpg?im=Resize=(1000,1000)' }
    ]

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100'>
            <HeaderCom />

            <marquee className='bg-green-600 py-2'>
                <p className='text-white font-bold text-lg m-0'>Fresh Vegetables Available Now! • Farm Fresh Quality • Handpicked Daily • Affordable Prices • Pure, Clean & Healthy Choices for Your Family!</p>
            </marquee>

            <div className='flex-1 px-4 py-6'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {vegetables.map((veg) => (
                        <div key={veg.id} className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                            <img src={veg.image} alt={veg.name} className='w-full h-40 md:h-48 object-cover' />
                            <div className='p-4 text-center'>
                                <p className='font-bold text-gray-800 text-sm md:text-base'>{veg.name}</p>
                                <p className='text-green-600 font-semibold my-2'>{veg.price}</p>
                                <button
                                    className='w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition'
                                    onClick={handleAddToCard}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <LandingFooter />
        </div>
    )
}

export default VegPage
