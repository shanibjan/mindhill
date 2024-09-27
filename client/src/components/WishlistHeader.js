import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import Wishlist from "../images/wishlist.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const WishlistHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
const[data,setData]=useState([])
const fetchCartData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/product/get-cart/${userId}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
    fetchCartData()
   
  },[])
 
  const nav = useNavigate();
  return (
    <div>
      <div
        className="overflow-hidden py-[3%] px-[4%] bg-cover bg"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Wishlist}) center/cover`,
        }}
      >
        <div className="flex justify-between text-white items-center">
              <div onClick={() => nav("/")}>
              <h2 className="font-AbrilRegular text-[40px] cursor-pointer">MIND HILL</h2>
              </div>
              <div className="flex justify-between w-[30%] max-lg:w-[50%] items-center font-gorditaMedium cursor-pointer">
                <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
                  <FontAwesomeIcon icon={faSearch} className="h-[23px]" />
                </div>
                
                <div onClick={() => {user?nav("/cart"):window.alert("Please Login")}} className="bg-[#94C4F7] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center relative">
                  <FontAwesomeIcon
                    icon={faShoppingBasket}
                    className="h-[23px]"
                  />
                  <h1 className="absolute right-[-15%] bottom-[-20%] bg-white text-[#244262] w-[25px] h-[25px] rounded-[50%] p-[5%]" >{user?data.length:"0"}</h1>
                </div>
                <div className="dropdown">
                  {user ? (
                    <div className="rounded-[50%] w-[50px] h-[50px]">
                      <img
                        className="h-full w-full object-cover rounded-[50%]"
                        src={user.profile}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center ">
                      <FontAwesomeIcon icon={faUser} className="h-[23px]" />
                    </div>
                  )}

                  <ul className="dropdown-menu text-[#244262] leading-[35px] ">
                    <li
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        nav("/login");
                      }}
                    >
                      {user ? "Logout" : "Login"}
                    </li>
                    <li>{user ? "" : "Register"}</li>
                    <li>Admin</li>
                    <li>{user ? "My orders" : ""}</li>
                  </ul>
                </div>
              </div>
            </div>
        <div className="text-white h-[370px] flex items-center">
          <div className="w-full">
            <h1 className="  text-[70px] font-AbrilRegular">Wishlist</h1>
            <p className="font-gorditaRegular my-[4%]">
              {" "}
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistHeader;
