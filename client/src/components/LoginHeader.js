import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSearch,
  faEllipsisH,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import productOverView from "../images/product-overview.jpg";
import { useNavigate } from "react-router-dom";
import {motion, AnimatePresence } from "framer-motion";
const LoginHeader = ({ prop }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
 
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef(null);
  const [searchQuery, setsearchQuery] = useState("");
  const nav = useNavigate();

  const janu = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const searchProducts = () => {
    console.log(searchQuery);

    nav("/search", { state: searchQuery });
  };

  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus(); // Focus on the input when it is displayed
    }
  }, [isSearchVisible]);

  return (
    <div>
      <div
        className="overflow-visible py-[3%] px-[4%] bg-cover bg fixed w-full mt-[-14%] max-[600px]:mt-[-30%] z-10 "
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${productOverView}) center/cover`,
        }}
      >
        <div className="relative">
          <AnimatePresence>
            {isSearchVisible && (
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full z-[200]"
              >
                <div className="flex justify-between items-center bg-white px-[3%]">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => setsearchQuery(e.target.value)}
                    className="w-[90%] max-[800px]:w-[75%] max-[500px]:w-[70%] h-[70px]  text-[20px] max-[550px]:text-[15px]  text-[#244262] font-gorditaRegular outline-none"
                  />

                  <div
                    onClick={searchProducts}
                    className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] max-[550px]:w-[30px] max-[550px]:h-[30px] flex justify-center items-center text-white"
                  >
                    <FontAwesomeIcon icon={faSearch} className="h-[23px] max-[550px]:h-[15px]" />
                  </div>

                  <div
                    onClick={() => setIsSearchVisible((prev) => !prev)}
                    className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] max-[550px]:w-[30px] max-[550px]:h-[30px]  flex justify-center items-center text-white ml-[3%]"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-[23px] max-[550px]:h-[15px]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between text-white items-center max-[600px]:block">
            <div onClick={() => nav("/")}>
              <h2 className="font-AbrilRegular text-[40px] cursor-pointer max-[600px]:mb-[6%]">
                MIND HILL
              </h2>
            </div>
            <div className="flex justify-between w-[30%] max-lg:w-[50%] max-[600px]:w-full items-center font-gorditaMedium cursor-pointer">
              <div
                onClick={janu}
                className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[40px] max-[550px]:h-[40px] flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faSearch} className="h-[23px] max-[550px]:h-[15px]" />
              </div>

              <div
                onClick={() => {
                  user ? nav("/wishlist") : window.alert("Please Login");
                }}
                className="bg-[#244262] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[40px] max-[550px]:h-[40px] flex justify-center items-center relative"
              >
                <FontAwesomeIcon icon={faHeart} className="h-[23px] max-[550px]:h-[15px]" />
                
              </div>
              <div
                onClick={() => {
                  user ? nav("/cart") : window.alert("Please Login");
                }}
                className="bg-[#94C4F7] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[40px] max-[550px]:h-[40px] flex justify-center items-center relative"
              >
                <FontAwesomeIcon icon={faShoppingBasket} className="h-[23px] max-[550px]:h-[15px]" />
                
              </div>
              <div className="dropdown">
              <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[40px] max-[550px]:h-[40px] flex justify-center items-center ">
                <FontAwesomeIcon icon={faUser} className="h-[23px] max-[550px]:h-[15px]" />
              </div>
              <ul className="dropdown-menu text-[#244262] leading-[35px] max-[1000px]:px-[20px] max-[550px]:text-[11px] max-[1000px]:left-[-60px] max-[500px]:left-[-80px] max-[1000px]:w-[150px]  ">
                <li onClick={() => nav("/login")}>
                  {prop === "Register" ? "Login" : ""}
                </li>
                <li onClick={() => nav("/signup")}>
                  {prop === "Login" ? "Register" : ""}
                </li>
                <li onClick={() => nav("/admin")}>Admin</li>
              </ul>
            </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;



