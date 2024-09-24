import React from 'react';
import WishlistHeader from '../components/WishlistHeader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import p11 from "../images/product-11.jpg";
import Footer from '../components/Footer';

const WishList = ({ }) => {
  return (
    <div>
     <WishlistHeader/>
     <div className="px-[10%] py-[5%]" >
          <div className="flex justify-between text-left py-[1%] text-[20px] font-AbrilRegular text-[#244262] items-center ">
            <div className="w-[5%]"></div>
            <div className="w-[10%]"></div>
            <div className="w-[25%]">
              <h1>Product</h1>
            </div>
            <div className="w-[20%]">
              <h1>Price</h1>
            </div>
            <div className="w-[20%]">
              <h1>Stock Status</h1>
            </div>
            <div className="w-[20%]">
              
            </div>
          </div>

          <div className="flex justify-between text-left py-[1%] text-[16px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]">
            <div className="w-[5%]">
              <div className=" cursor-pointer h-[100px] flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="h-[28%] text-[#244262] "
                />
              </div>
            </div>
            <div className="w-[10%] p-[1%]">
              <img src={p11} alt="" />
            </div>
            <div className="w-[25%]">
              <h1>Spinach</h1>
            </div>
            <div className="w-[20%]">
              <h1>$3</h1>
            </div>
            <div className="w-[20%]">
              <h4>In stock</h4>
            </div>
            <div className="w-[20%]">
            <button className="bg-[#94C4F7] py-[5%] px-[10%] font-gorditaBold text-[12px] tracking-[2px]  text-white">
              ADD TO CART
            </button>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  );
};

export default WishList;