import React, { useContext, useEffect, useState } from "react";
import WishlistHeader from "../components/WishlistHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import p11 from "../images/product-11.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { PostContext } from "../store/postContext";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const [data, setData] = useState([]);
const nav=useNavigate()
const{setPostDetails}=useContext(PostContext)
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/v1/product/favorite/${userId}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const removeFav=async(productId)=>{

    try {
      const res=await axios.post('api/v1/product/remove-fav',{userId,productId})
      console.log(res.data);
      if(res.data.success){
      
        fetchData();
    
      }
      
    } catch (error) {
      window.alert(error.response.data.error);
      
    }
  }
  return (
    <div>
      <WishlistHeader />
      <div className="px-[10%] py-[5%]">
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
          <div className="w-[20%]"></div>
        </div>
        {data.map((items) => {
          return (
            <div className="flex justify-between text-left py-[1%] text-[16px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]">
              <div className="w-[5%]">
                <div className=" cursor-pointer h-[100px] flex justify-center items-center">
                  <FontAwesomeIcon
                  onClick={()=>removeFav(items._id)}
                    icon={faTimesCircle}
                    className="h-[28%] text-[#244262] "
                  />
                </div>
              </div>
              <div  className="w-[10%] p-[1%]">
                <img src={items.img1} alt="" />
              </div>
              <div className="w-[25%]">
                <h1>{items.name}</h1>
              </div>
              <div className="w-[20%]">
                <h1>${items.offerPrice}</h1>
              </div>
              <div className="w-[20%]">
                <h4>In stock</h4>
              </div>
              <div className="w-[20%]">
                <button onClick={()=>{setPostDetails(items);nav('/overview')}} className="bg-[#94C4F7] py-[5%] px-[10%] font-gorditaBold text-[12px] tracking-[2px]  text-white">
                 VIEW DETAILS
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default WishList;
