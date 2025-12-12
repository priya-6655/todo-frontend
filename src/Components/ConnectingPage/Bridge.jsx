import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCom from './HeaderCom';
import LandingFooter from '../LandingPage/LandingFooter';

function Bridge() {
    const navigate = useNavigate();
    const handleNavigate = (path) => navigate(path);

    const options = [
        { label: 'Book Flight', path: '/flight', color: 'bg-blue-600 hover:bg-blue-700' },
        { label: 'Order Veg & Groceries', path: '/groceries', color: 'bg-green-600 hover:bg-green-700' },
        { label: 'Shop Dress', path: '/shop-dress', color: 'bg-yellow-500 hover:bg-yellow-600' },
        { label: 'Todo Creation', path: '/todo', color: 'bg-cyan-500 hover:bg-cyan-600' }
    ];

    return (
        <div className='min-h-screen flex flex-col'>
            <HeaderCom />
            
            <div className='flex-1 bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center justify-center px-4 py-8'>
                <p className='text-2xl font-bold underline mb-16 text-gray-800'>Choose an Option</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl'>
                    {options.map((opt, idx) => (
                        <button 
                            key={idx}
                            onClick={() => handleNavigate(opt.path)} 
                            className={`${opt.color} text-white font-semibold py-4 px-6 rounded-full transition shadow-lg hover:shadow-xl`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <LandingFooter />
        </div>
    );
}

export default Bridge;
