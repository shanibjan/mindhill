import React from 'react';
import h from '../images/h431.png'

const Footer = () => {
  return (
    <div className='bg-[#122235] h-[400px] mt-[4%]' >

    <div className='h-full  relative' >
        <img className='w-full h-full object-cover opacity-[.09]' src={h} alt="" />
        <div className='absolute w-full top-0 text-gray-400 grid grid-cols-3 max-md:grid-cols-1 h-full p-[4%] items-center gap-x-[9%]' >
        <div>
            <h3 className='text-white font-AbrilRegular text-[25px] mb-[6%]' >Address</h3>
            <p>Fifth Avenue 5501, Broadway, New York
            Morris Street London 1234</p>
        </div>
        <div>
            <h1 className='text-[#94C4F7] text-[25px] font-AbrilRegular mb-[6%]' >Grow Only Organic</h1>
            <p>A fresh and modern theme for all organic food and healthy product websites</p>
        </div>
        <div>
            <h3 className='text-white font-AbrilRegular text-[25px] mb-[6%]' >Email</h3>
            <p>shanibjan369@gmail.com</p>
            <p>shanibjan369@gmail.com</p>
        </div>
        </div>
        
    </div>
    </div>
  );
};

export default Footer;