import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LandingNav() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const openLogin = () => navigate('/login')
    const openVegPage = () => navigate('/orderVeg')

    const navItems = [
        { name: 'Book my tickets', img: 'https://cdn-icons-png.flaticon.com/512/9137/9137943.png' },
        { name: 'Todo App', img: 'https://cdn-icons-png.freepik.com/256/8476/8476658.png', onClick: openLogin },
        { name: 'Our freshes', img: 'https://www.pngplay.com/wp-content/uploads/8/Vegetable-Collection-Transparent-Free-PNG.png', onClick: openVegPage },
        { name: 'Groceries', img: 'https://png.pngtree.com/png-clipart/20240428/original/pngtree-grocery-basket-and-a-list-of-products-png-image_14956705.png' },
        { name: 'Dress collections', img: 'https://purepng.com/public/uploads/large/purepng.com-women-dressfashion-women-dress-cloth-apparelclothingwomen-dress-631522326940onrfa.png' }
    ]

    return (
        <nav className="w-screen h-[9vh] bg-gray-800/40 flex items-center px-5 shadow-md relative">


            <div className="flex items-center w-[3vw] h-[5vh] md-hidden" onClick={() => setOpen(!open)}>
                <img src="https://www.nicepng.com/png/full/321-3210180_professional-blank-logo-png-free-download-logo-red.png" alt="nav_Logo" className="sm-hidden" />
                <i className="bi bi-three-dots-vertical text-2xl cursor-pointer md:hidden"></i>
            </div>


            <div className="hidden md:flex items-center ml-5 flex-1 space-x-4">
                {navItems.map((item, idx) => (
                    <div key={idx} className="flex items-center cursor-pointer transition duration-300 hover:text-red-500" onClick={item.onClick || (() => { })}>
                        <img src={item.img} alt={item.name} className="w-5 h-5" />
                        <span className="text-base ml-1 font-medium">{item.name}</span>
                    </div>
                ))}
            </div>


            <input type="search" placeholder="Search..." className="hidden md:block w-[600px] p-[3px] rounded-[15px] border border-gray-500 outline-none mr-[20px]" />


            <div className="flex items-center ml-auto space-x-2">
                <i className="bi bi-cart text-2xl cursor-pointer font-bold transition duration-300 text-gray-700 hover:text-red-700"></i>
                <i className="bi bi-person-circle text-2xl cursor-pointer font-bold transition duration-300 text-gray-700 hover:text-red-700"></i>
            </div>


            {open && (
                <div className="absolute top-[9vh] left-0 w-full bg-white/95 shadow-md rounded-lg flex flex-col z-50">
                    {navItems.map((item, index) => (
                        <div key={index}
                            className="px-4 py-3 border-b last:border-none cursor-pointer hover:text-red-500 hover:bg-red-50 flex items-center text-gray-800 font-medium transition"
                            onClick={() => setOpen(false)}>
                            <span className="mr-3 text-red-500">›</span>
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    )
}

export default LandingNav



