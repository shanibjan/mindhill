import {
  faShoppingBag,
  faHeart as faHeartSolid,
  faSearch,
  faShoppingBasket,
  faUser,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PostContext } from "../store/postContext";
import productOverView from "../images/product-overview.jpg";
import { motion, AnimatePresence } from "framer-motion";
import WishlistHeader from "../components/WishlistHeader";

const Search = ({}) => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [wishlist, setWishList] = useState([]);
  
  const [products, setProducts] = useState([]);
  console.log(products);
  
  
  const [a, setA] = useState("");
  const nav = useNavigate();
  const [favList, setFavList] = useState([]);
  const { setPostDetails } = useContext(PostContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const[searchQuery,setSearchQuery]=useState("")
  
  

  
  
  

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
  
  const searchProducts=()=>{
    fetchSearch()
  }

  const fetchSearch = async () => {
    try {
      const res = await axios.get(`https://mindhill-7.onrender.com/api/v1/product/search?q=${searchQuery||location.state}`);
      setProducts(res.data);
    } catch (error) {}
  };
  const fetchFavoriteList = async () => {
    try {
      const res = await axios.get(`https://mindhill-7.onrender.com/api/v1/product/favoritelist/${userId}`);
      setFavList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearch();
    fetchFavoriteList();
    fetchCartData();
    fetchWishList();
  }, []);

  const star = ["☆", "☆", "☆", "☆", "☆"];
  const addtoFav = async (productId) => {
    try {
      const res = await axios.post("https://mindhill-7.onrender.com/api/v1/product/add-fav", {
        userId,
        productId,
      });
      console.log(res.data);
      if (res.data.success) {
        fetchFavoriteList();
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };
  const removeFav = async (productId) => {
    try {
      const res = await axios.post("https://mindhill-7.onrender.com/api/v1/product/remove-fav", {
        userId,
        productId,
      });
      console.log(res.data);
      if (res.data.success) {
        fetchFavoriteList();
      }
    } catch (error) {
      window.alert(error.response.data.error);
    }
  };

  const janu = () => {
    setIsSearchVisible((prev) => !prev);
  };

  setTimeout(() => {
    setA("Sorry, no products matched your criteria.");
  }, 500);
  

  return (
    <div>
       
       
      <div
        className="overflow-visible py-[3%] px-[4%] bg-cover bg  w-full  z-10 "
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
                <div className="flex items-center bg-white px-[3%]">
                  <input
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[90%] max-[800px]:w-[75%] max-[500px]:w-[70%] max-[550px]:text-[15px] h-[70px]  text-[20px] text-[#244262] font-gorditaRegular outline-none"
                  />

                  <div
                    onClick={searchProducts}
                    className="bg-[#244262] rounded-[50%] w-[40px]  max-[550px]:w-[30px] max-[550px]:h-[30px] h-[40px] flex justify-center items-center text-white"
                  >
                    <FontAwesomeIcon icon={faSearch} className="h-[23px] max-[550px]:h-[15px]" />
                  </div>

                  <div
                    onClick={() => setIsSearchVisible((prev) => !prev)}
                    className="bg-[#244262] rounded-[50%] w-[40px]  max-[550px]:w-[30px] max-[550px]:h-[30px] h-[40px] flex justify-center items-center text-white ml-[3%]"
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
            <div className="flex justify-between w-[30%] max-lg:w-[50%]  max-[600px]:w-full items-center font-gorditaMedium cursor-pointer">
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
                  <div className="rounded-[50%] w-[50px] h-[50px]">
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

                <ul className="dropdown-menu text-[#244262] leading-[35px] max-[1000px]:px-[20px] max-[550px]:text-[11px] max-[1000px]:left-[-60px] max-[500px]:left-[-77px] max-[1000px]:w-[130px] ">
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

        {products.length > 0 ? (
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 p-[4%] gap-12 ">
          {products.map((product) => {
            return (
              <div
                style={{
                  background: `url(${product.img1}) center/cover`,
                }}
                className="relative h-[500px] "
              >
                {/* <div>
                          <img src={product.src} alt="" />
                      </div> */}
                <div
                  onClick={() => {
                    setPostDetails(product);
                    nav("/overview");
                  }}
                  className="h-[77%]"
                ></div>
                <div className="flex justify-between absolute bottom-0 w-full p-[6%]  ">
                  <div className="text-left text-[#244262] ">
                    <h4 className="font-AbrilRegular text-[20px]  ">
                      {product.name}
                    </h4>
                    <p className="font-gorditaRegular">
                      ${product.offerPrice}/kg
                    </p>
                    <p className="grid grid-cols-5 gap-x-2">
                      {star.map((s, i) => {
                        return <p>{i < product.rating ? "★" : "☆"}</p>;
                      })}
                    </p>
                  </div>
                  <div className="w-[55%]">
                    <div className="flex justify-end font-AbrilRegular text-[20px] mb-[4%] ">
                      <h4 className="line-through text-[#244262] ">
                        ${product.price}
                      </h4>
                      <h4 className="ml-[17%] text-[#FFA27E] ">
                        {" "}
                        ${product.offerPrice}
                      </h4>
                    </div>
                    <div className="flex justify-between text-white ">
                      <div className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faShoppingBag}
                          className="h-[18px]"
                        />
                      </div>
                      <div className="bg-[#94C4F7] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                        <FontAwesomeIcon icon={faEye} className="h-[18px]" />
                      </div>
                      <div className="bg-[#FFA27E] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                        {favList.includes(product._id) ? (
                          <FontAwesomeIcon
                            onClick={() => removeFav(product._id)}
                            icon={faHeartSolid}
                            className="h-[18px] "
                          />
                        ) : (
                          <FontAwesomeIcon
                            onClick={() => addtoFav(product._id)}
                            icon={faHeart}
                            className="h-[18px] "
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        ) : (
          <div className="font-AbrilRegular text-[23px] max-[550px]:text-[13px] text-[#244262] ">
            {a}
          </div>
        )}
      
    </div>
  );
};

export default Search;
