import React, { useEffect, useState } from "react";
import bg1 from "../images/bg-1.jpg";
import bg2 from "../images/bg-2.jpg";
import bg3 from "../images/bg-3.jpg";
import icon1 from "../images/icon-1.webp";
import icon2 from "../images/icon-2.webp";
import icon3 from "../images/icon-3.webp";
import icon4 from "../images/icon-4.webp";
import icon5 from "../images/icon-5.webp";
import icon6 from "../images/icon-6.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "animate.css/animate.min.css";
import OwlCarousel from 'react-owl-carousel';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion,AnimatePresence } from 'framer-motion';


const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const [data, setData] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const [searchQuery, setsearchQuery] = useState('');
  
  

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
  const fetchWishList = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/product/favorite/${userId}`
      );
      setWishList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartData();
    fetchWishList();
  }, []);

  const nav = useNavigate();

  
  const icons = [
    { src: icon1, tag: "Delivery", subTag: "Prion Gravida" },
    { src: icon2, tag: "Online Shop", subTag: "Prion Gravida" },
    { src: icon3, tag: "Great Value", subTag: "Prion Gravida" },
    { src: icon4, tag: "Discount", subTag: "Prion Gravida" },
    { src: icon5, tag: "Easy Pay", subTag: "Prion Gravida" },
    { src: icon6, tag: "Security", subTag: "Prion Gravida" },
  ];
  const janu = () => {
    setIsSearchVisible(prev => !prev);
  };
  

  

  
  return (
    <div>
      
      
          <div
           
            className="overflow-hidden py-[3%] px-[4%] bg-cover bg"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bg1}) center/cover`,
            }}
          >
            <div className="relative" >
              <AnimatePresence>
              {isSearchVisible && (
                <motion.div initial={{ y: -100 }} 
                animate={{ y: 0 }} 
                exit={{y:-100}}
                transition={{ duration: .5 }} className="absolute w-full z-[200]" >
                  <div className="flex items-center bg-white px-[3%]">
                  <input
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e)=>setsearchQuery(e.target.value)}
                    className="w-[90%] h-[70px]  text-[20px] text-[#244262] font-gorditaRegular outline-none"
                  />

                  <div onClick={()=>
                    nav('/search',{state:searchQuery})
                    
                  } className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center text-white">
                    <FontAwesomeIcon icon={faSearch} className="h-[23px]" />
                  </div>

                  <div onClick={()=>setIsSearchVisible(prev=>!prev)} className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center text-white ml-[3%]">
                    <FontAwesomeIcon icon={faTimes} className="h-[23px]" />
                  </div>
                </div>
                </motion.div>
                
               )} 
              </AnimatePresence>
              

              <div className="flex justify-between text-white items-center">
                <div onClick={() => nav("/")}>
                  <h2 className="font-AbrilRegular text-[40px] cursor-pointer">
                    MIND HILL
                  </h2>
                </div>
                <div className="flex justify-between w-[30%] max-lg:w-[50%] items-center font-gorditaMedium cursor-pointer">
                  <div onClick={janu} className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faSearch} className="h-[23px]" />
                  </div>

                  <div
                    onClick={() => {
                      user ? nav("/wishlist") : window.alert("Please Login");
                    }}
                    className="bg-[#244262] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center relative"
                  >
                    <FontAwesomeIcon icon={faHeart} className="h-[23px]" />
                    <h1 className="absolute right-[-15%] bottom-[-20%] bg-white text-[#244262] w-[25px] h-[25px] rounded-[50%] p-[5%]">
                      {user ? wishlist.length : "0"}
                    </h1>
                  </div>
                  <div
                    onClick={() => {
                      user ? nav("/cart") : window.alert("Please Login");
                    }}
                    className="bg-[#94C4F7] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center relative"
                  >
                    <FontAwesomeIcon
                      icon={faShoppingBasket}
                      className="h-[23px]"
                    />
                    <h1 className="absolute right-[-15%] bottom-[-20%] bg-white text-[#244262] w-[25px] h-[25px] rounded-[50%] p-[5%]">
                      {user ? data.length : "0"}
                    </h1>
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
                      <li onClick={() => nav("/signup")}>
                        {user ? "" : "Register"}
                      </li>
                      <li onClick={() => nav("/admin")}>Admin</li>
                      <li onClick={() => nav("/user_orders")}>
                        {user ? "My orders" : ""}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-white h-[513px] flex items-center">
              <div className="slideInFromTop">
                <h4 className="text-[25px] tracking-[25px] font-gorditaRegular">
                  ORGANIC
                </h4>
                <h1 className="  text-[100px] font-AbrilRegular">
                  Green Way
                </h1>
                <p className="font-gorditaRegular my-[4%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, eum accusantium laboriosam dignissimos eveniet debitis quidem veniam obcaecati, repellendus inventore provident cumque consectetur ipsum aut? Incidunt ipsa in modi excepturi!</p>
                <button className="bg-[#94C4F7] py-[1%] px-[3%] font-gorditaMedium more">
                  VIEW MORE
                </button>
              </div>
            </div>
          </div>
       
     
      <div className="grid grid-cols-6 max-md:grid-cols-3 max-sm:grid-cols-2 py-[3%] px-[4%] gap-x-[5%] shadow-lg">
        {icons.map((icon) => {
          return (
            <div className="flex justify-between items-center ">
              <div>
                <img className="w-full" src={icon.src} alt="" />
              </div>
              <div>
                <h2 className="font-AbrilRegular">{icon.tag}</h2>
                <h3 className="font-gorditaRegular">{icon.subTag}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
