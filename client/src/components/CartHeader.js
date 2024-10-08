import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import cart from "../images/cart.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion,AnimatePresence } from "framer-motion";
const CartHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const [wishlist, setWishList] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef(null);
  const [searchQuery, setsearchQuery] = useState("");

  
  const fetchWishList = async () => {
    try {
      const res = await axios.get(
        `https://mindhill-7.onrender.com/api/v1/product/favorite/${userId}`
      );
      setWishList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWishList();
   
  }, []);
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
        className="overflow-hidden max-[550px]:overflow-visible py-[3%] px-[4%] bg-cover bg mb-[4%]"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${cart}) center/cover`,
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
                <div className="flex items-center justify-between bg-white px-[3%]">
                  <input
                   ref={inputRef}
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => setsearchQuery(e.target.value)}
                    className="w-[90%] max-[550px]:w-[70%] h-[70px]  text-[20px] max-[550px]:text-[15px] text-[#244262] font-gorditaRegular outline-none"
                  />

                  <div
                    onClick={searchProducts}
                    className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] max-[550px]:w-[30px] max-[550px]:h-[30px] flex justify-center items-center text-white"
                  >
                    <FontAwesomeIcon icon={faSearch} className="h-[23px] max-[550px]:h-[15px]" />
                  </div>

                  <div
                    onClick={() => setIsSearchVisible((prev) => !prev)}
                    className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] max-[550px]:w-[30px] max-[550px]:h-[30px] flex justify-center items-center text-white ml-[3%]"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-[23px] max-[550px]:h-[15px]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between text-white items-center">
            <div onClick={() => nav("/")}>
              <h2 className="font-AbrilRegular text-[40px] max-[550px]:text-[25px] cursor-pointer">
                MIND HILL
              </h2>
            </div>
            <div className="flex justify-between w-[30%] max-lg:w-[50%] items-center font-gorditaMedium cursor-pointer">
              <div
                onClick={janu}
                className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[35px] max-[550px]:h-[35px] flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faSearch} className="h-[23px] max-[550px]:h-[15px]" />
              </div>

              
              <div
                onClick={() => {
                  user ? nav("/wishlist") : window.alert("Please Login");
                }}
                className="bg-[#94C4F7] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[35px] max-[550px]:h-[35px] flex justify-center items-center relative"
              >
                <FontAwesomeIcon icon={faHeart} className="h-[23px] max-[550px]:h-[15px]" />
                <h1 className="absolute right-[-15%] bottom-[-20%] bg-white text-[#244262] w-[25px] h-[25px] max-[550px]:w-[20px] max-[550px]:h-[20px] max-[550px]:text-[12px] rounded-[50%] p-[5%]">
                  {user ? wishlist.length : "0"}
                </h1>
              </div>
              <div className="dropdown">
                {user ? (
                  <div className="rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[35px] max-[550px]:h-[35px] ">
                    <img
                      className="h-full w-full object-cover rounded-[50%]"
                      src={user.profile}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[35px] max-[550px]:h-[35px] flex justify-center items-center ">
                    <FontAwesomeIcon icon={faUser} className="h-[23px] max-[550px]:h-[15px]" />
                  </div>
                )}

                <ul className="dropdown-menu text-[#244262] leading-[35px] max-[1000px]:px-[20px] max-[1000px]:left-[-60px] max-[550px]:left-[-80px]  max-[550px]:text-[11px]  max-[550px]:w-[135px] max-[470px]:left-[-97px] max-[470px]:px-[10px]  max-[1000px]:w-[150px] ">
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
                  
                  <li onClick={() => nav("/user_orders")}>
                    {user ? "My orders" : ""}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white h-[370px] max-[550px]:h-0 flex items-center">
          <div className="w-full max-[550px]:hidden">
            <h1 className="  text-[70px] font-AbrilRegular">Cart</h1>
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

export default CartHeader;
