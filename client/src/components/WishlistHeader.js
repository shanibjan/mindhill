import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import Wishlist from "../images/wishlist.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion,AnimatePresence } from "framer-motion";
const WishlistHeader = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [searchQuery, setsearchQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const [data, setData] = useState([]);
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
  useEffect(() => {
    fetchCartData();
  }, []);
  const janu = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const nav = useNavigate();
  const searchProducts = () => {
    

    nav("/search", { state: searchQuery });
  };
  return (
    <div>
      <div
        className="overflow-hidden py-[3%] px-[4%] bg-cover bg"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Wishlist}) center/cover`,
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
                <div className="flex items-center bg-white px-[3%]">
                  <input
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => setsearchQuery(e.target.value)}
                    className="w-[90%] h-[70px]  text-[20px] text-[#244262] font-gorditaRegular outline-none"
                  />

                  <div
                    onClick={searchProducts}
                    className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center text-white"
                  >
                    <FontAwesomeIcon icon={faSearch} className="h-[23px]" />
                  </div>

                  <div
                    onClick={() => setIsSearchVisible((prev) => !prev)}
                    className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center text-white ml-[3%]"
                  >
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
              <div
                onClick={janu}
                className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faSearch} className="h-[23px]" />
              </div>

              
              <div
                onClick={() => {
                  user ? nav("/cart") : window.alert("Please Login");
                }}
                className="bg-[#94C4F7] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center relative"
              >
                <FontAwesomeIcon icon={faShoppingBasket} className="h-[23px]" />
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
