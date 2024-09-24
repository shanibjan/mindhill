import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import Wishlist from '../images/wishlist.jpg'
const WishlistHeader = () => {
  return (
    <div>
     <div
            
            className="overflow-hidden py-[3%] px-[4%] bg-cover bg"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Wishlist}) center/cover`,
            }}
          >
            <div className="flex justify-between text-white items-center">
              <div>
                <h2 className="font-AbrilRegular text-[40px]">MIND HILL</h2>
              </div>
              <div className="flex justify-between w-[30%] max-lg:w-[50%] items-center font-gorditaMedium">
                
                <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
                  <FontAwesomeIcon icon={faSearch} className="h-[23px]" />
                </div>
                <div className="bg-[#244262] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
                  <FontAwesomeIcon icon={faHeart} className="h-[23px]" />
                </div>
                <div className="bg-[#94C4F7] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faShoppingBasket}
                    className="h-[23px]"
                  />
                </div>
                <div className="dropdown">
                  <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center ">
                    <FontAwesomeIcon icon={faUser} className="h-[23px]" />
                  </div>
                  <ul className="dropdown-menu text-[#244262] leading-[35px] ">
                    <li>Login</li>
                    <li>Register</li>
                    <li>Admin</li>
                    <li>My Orders</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-white h-[370px] flex items-center">
              <div className="w-full">
                
                <h1 className="  text-[70px] font-AbrilRegular">
                 Wishlist
                </h1>
                <p className="font-gorditaRegular my-[4%]"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor</p>
                
              </div>
            </div>
          </div>
    </div>
  );
};

export default WishlistHeader;