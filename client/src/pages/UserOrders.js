import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faShoppingBasket,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import productOverView from "../images/product-overview.jpg";
import loading from '../images/buffering-colors.gif'

const UserOrders = () => {
  const [order, setOrder] = useState([]);
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [wishlist, setWishList] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [a, setA] = useState("");
  const [isLoading,setIsLoading]=useState(true)
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const userName = user ? user.name : null;
  const inputRef = useRef(null);
  const fetchorder = async () => {
    const res = await axios.get(`https://mindhill-7.onrender.com/api/v1/product/get-order/${userId}`);
    if(res){
      setOrder(res.data);
      setIsLoading(false)
    }else{
      setIsLoading(false)
      setOrder([])
    }
  };
  order.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const fetchCartData = async () => {
    try {
      const res = await axios.get(
        `https://mindhill-7.onrender.com/api/v1/product/get-cart/${userId}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
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

  const janu = () => {
    setIsSearchVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchorder();
    fetchCartData();
    fetchWishList();
  }, []);

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
    <div className="mt-[10%] max-[1200px]:mt-[14%] max-[650px]:mt-[20%] max-[600px]:mt-[35%] max-[400px]:mt-[43%]">
      <div
        className="overflow-visible py-[3%] px-[4%] bg-cover bg fixed w-full mt-[-10%] max-[1200px]:mt-[-14%] max-[650px]:mt-[-20%] max-[600px]:mt-[-35%] max-[400px]:mt-[-43%]  z-10 "
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
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="h-[23px] max-[550px]:h-[15px]"
                    />
                  </div>

                  <div
                    onClick={() => setIsSearchVisible((prev) => !prev)}
                    className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] max-[550px]:w-[30px] max-[550px]:h-[30px]  flex justify-center items-center text-white ml-[3%]"
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="h-[23px] max-[550px]:h-[15px]"
                    />
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
                <FontAwesomeIcon
                  icon={faSearch}
                  className="h-[23px] max-[550px]:h-[15px]"
                />
              </div>

              <div
                onClick={() => {
                  user ? nav("/wishlist") : window.alert("Please Login");
                }}
                className="bg-[#244262] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[40px] max-[550px]:h-[40px] flex justify-center items-center relative"
              >
                <FontAwesomeIcon icon={faHeart} className="h-[23px] max-[550px]:h-[15px]" />
                <h1 className="absolute right-[-15%] bottom-[-20%] bg-white text-[#244262] w-[25px] h-[25px] rounded-[50%] p-[5%]">
                  {user ? wishlist.length : "0"}
                </h1>
              </div>
              <div
                onClick={() => {
                  user ? nav("/cart") : window.alert("Please Login");
                }}
                className="bg-[#94C4F7] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[40px] max-[550px]:h-[40px] flex justify-center items-center relative"
              >
                <FontAwesomeIcon icon={faShoppingBasket} className="h-[23px] max-[550px]:h-[15px]" />
                <h1 className="absolute right-[-15%] bottom-[-20%] bg-white text-[#244262] w-[25px] h-[25px] rounded-[50%] p-[5%]">
                  {user ? data.length : "0"}
                </h1>
              </div>
              <div className="dropdown">
                {user ? (
                  <div className="rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[40px] max-[550px]:h-[40px] ">
                    <img
                      className="h-full w-full object-cover rounded-[50%]"
                      src={user.profile}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] max-[550px]:w-[40px] max-[550px]:h-[40px] flex justify-center items-center ">
                    <FontAwesomeIcon icon={faUser} className="h-[23px] max-[550px]:h-[15px]" />
                  </div>
                )}

                <ul className="dropdown-menu text-[#244262] leading-[35px] max-[1000px]:px-[20px] max-[1000px]:left-[-60px] max-[550px]:text-[11px] max-[500px]:left-[-80px] max-[1000px]:w-[150px] ">
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
      </div>

      <h1 className="font-AbrilRegular text-[#244262] text-[40px]  max-[550px]:text-[30px] max-[370px]:text-[25px]  my-[5%]">
        User Orders
      </h1>
      {isLoading? <div className="h-[400px]">
        <img src={loading} alt="" className="mx-auto max-[550px]:h-[50px] max-[400px]:h-[25px]" />
      </div>:null}
      {order.length>0?(
        <div className="px-[3%]">
        <div>
          <h2 className="font-gorditaMedium">User:{userName}</h2>
          <div>
            <div>
              <div className="flex justify-between text-left py-[1%] text-[20px] max-[550px]:text-[15px] max-[470px]:text-[13px] font-AbrilRegular text-[#244262] items-center ">
                <div className="w-[5%] max-[550px]:w-[2%]"></div>
                <div className="w-[10%] max-[550px]:hidden"></div>
                <div className="w-[25%]">
                  <h1>Product</h1>
                </div>
                <div className="w-[20%]">
                  <h1>Price</h1>
                </div>
                <div className="w-[20%]">
                  <h1>Quantity</h1>
                </div>
                <div className="w-[20%]">
                  <h1>Order status</h1>
                </div>
              </div>
              {order.map((items, index) => {
                return (
                  <div className=" border-[1px] border-gray-300 shadow-lg mb-[4%]">
                    <h1 className="text-left font-AbrilRegular text-[#244262] text-[30px] max-[550px]:text-[20px] p-[2%]">
                      Order No:{index + 1}
                    </h1>

                    {items.product.map((item) => {
                      return (
                        <div className="flex justify-between text-left py-[1%] text-[16px] max-[550px]:text-[13px] max-[470px]:text-[12px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px] max-[550px]:h-[65px]">
                          <div className="w-[5%] max-[550px]:w-[2%]"></div>
                          <div className="w-[10%] p-[1%] max-[550px]:hidden">
                            <img src={item.img1} alt="" />
                          </div>
                          <div className="w-[25%]">
                            <h1>{item.name}</h1>
                          </div>
                          <div className="w-[20%]">
                            <h1>₹{item.offerPrice * item.quantity}</h1>
                          </div>
                          <div className="w-[20%]">
                            <div className="flex items-center h-[54px] ">
                              <div className="py-[15px] px-[25px] max-[550px]:py-[12px] max-[550px]:px-[20px] max-[400px]:py-[10px] max-[400px]:px-[15px] bg-[#EBF5FF] font-gorditaRegular">
                                <h3>{item.quantity}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="w-[20%]">
                            <h1>{items.status}</h1>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex justify-evenly font-gorditaMedium my-[5%] max-[550px]:text-[12px] max-[400px]:text-[10px] max-[500px]:block  ">
                      <div className="w-[30%] text-left max-[500px]:text-center max-[500px]:w-full"> 
                        <h2>Delivery Address:</h2>
                        <div className="font-gorditaRegular">
                          <p>{items.address}</p>
                        </div>
                      </div>
                      <h2 className="max-[500px]:my-[4%]" >Status:{items.status}</h2>

                      <div>
                        <h2>Total bill: ₹{items.bill} /-</h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      ): isLoading===false? (
        <div className="font-AbrilRegular text-[23px] text-[#244262] mt-[4%] h-[400px] max-[450px]:h-[300px] flex justify-center items-center max-[550px]:text-[15px] max-[400px]:text-[13px] "  >{a}</div>
      ):null}
    </div>
  );
};

export default UserOrders;
