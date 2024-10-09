import React, { useContext, useEffect, useState } from "react";
import WishlistHeader from "../components/WishlistHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";
import { PostContext } from "../store/postContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config';
import loading from '../images/buffering-colors.gif'


const WishList = () => {
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading]=useState(true)
 
  
const nav=useNavigate()
const [a, setA] = useState("");
const{setPostDetails}=useContext(PostContext)
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/product/favorite/${userId}`);
      if(res){
        setData(res.data);
        setIsLoading(false)
      }else{
        setIsLoading(false)
        setData([])
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const removeFav=async(productId)=>{

    try {
      const res=await axios.post(`${API_URL}/api/v1/product/remove-fav`,{userId,productId})
      console.log(res.data);
      if(res.data.success){
      
        fetchData();
    
      }
      
    } catch (error) {
      window.alert(error.response.data.error);
      
    }
  }

  setTimeout(() => {
    setA("Sorry, your wishlist is empty");
  }, 500);
 
  return (
    <div>
      <WishlistHeader />
      {isLoading? <div className="h-[400px] max-[450px]:h-[300px]">
        <img src={loading} alt="" className="mx-auto max-[550px]:h-[50px] max-[400px]:h-[25px]" />
      </div>:null}
      {data.length>0?(
        <div className="px-[10%] py-[5%] ">
        <div className="flex justify-between text-left py-[1%] text-[20px] max-[550px]:text-[15px] font-AbrilRegular text-[#244262] items-center ">
          <div className="w-[5%]"></div>
          <div className="w-[10%] max-[550px]:w-[2%]"></div>
          <div className="w-[25%] max-[430px]:w-[20%]">
            <h1>Product</h1>
          </div>
          <div className="w-[20%] max-[430px]:w-[20%]">
            <h1>Price</h1>
          </div>
          <div className="w-[20%] max-[430px]:hidden">
            <h1>Stock Status</h1>
          </div>
          <div className="w-[20%] max-[430px]:w-[20%]"></div>
        </div>

        
        {data.map((items) => {
          return (
            <div className="flex justify-between text-left py-[1%] text-[16px] max-[550px]:text-[13px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]">
              <div className="w-[5%]">
                <div className=" cursor-pointer h-[100px] max-[550px]:h-[55px] flex justify-center items-center">
                  <FontAwesomeIcon
                  onClick={()=>removeFav(items._id)}
                    icon={faTimesCircle}
                    className="h-[28%] text-[#244262] "
                  />
                </div>
              </div>
              <div  className="w-[10%] p-[1%] max-[550px]:w-[2%] ">
                <img className="max-[550px]:hidden" src={items.img1} alt="" />
              </div>
              <div className="w-[25%] max-[430px]:w-[20%]">
                <h1>{items.name}</h1>
              </div>
              <div className="w-[20%] max-[430px]:w-[20%]">
                <h1>₹{items.offerPrice}</h1>
              </div>
              <div className="w-[20%] max-[430px]:hidden">
                <h4>In stock</h4>
              </div>
              <div className="w-[20%] max-[430px]:w-[25%]">
                <button onClick={()=>{nav(`/${items._id}`)}} className="bg-[#94C4F7] py-[5%] px-[10%] font-gorditaBold text-[12px] max-[430px]:w-[100%] max-[430px]:text-[8px] tracking-[2px]  text-white">
                 VIEW DETAILS
                </button>
              </div>
            </div>
          );
        })} </div>): isLoading===false? (
          <div className="font-AbrilRegular text-[23px] text-[#244262] mt-[4%] h-[400px] max-[450px]:h-[300px] flex justify-center items-center max-[550px]:text-[15px] max-[400px]:text-[13px] "  >{a}</div>
        ):null}
      
     
      <Footer />
    </div>
  );
};

export default WishList;
