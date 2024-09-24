import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSearch,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
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
              <div className="flex justify-between w-[50%] items-center font-gorditaMedium">
                <h4>HOME</h4>
                <h4>PAGES</h4>
                <h4>SHOP</h4>
                <h4>PORTFOLIO</h4>
                <h4>BLOG</h4>
                <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faShoppingBasket}
                    className="h-[23px]"
                  />
                </div>
                <div>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faEllipsisH} />
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