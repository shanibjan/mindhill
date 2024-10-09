import React, { useContext, useEffect, useState } from "react";
import pIcon1 from "../images/p-icon-1.webp";
import pIcon2 from "../images/p-icon-2.webp";
import pIcon3 from "../images/p-icon-3.webp";
import pIcon4 from "../images/p-icon-4.png";
import pIcon5 from "../images/p-icon-5.webp";
import pIcon6 from "../images/p-icon-6.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag,faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios'
import { PostContext } from "../store/postContext";
import { useNavigate } from "react-router-dom";
import loading from '../images/buffering-colors.gif'

const Products = () => {
  const [bgColor, setBgColor] = useState("Show All");
  const [products,setProducts]=useState([])
  const [isLoading,setIsLoading]=useState(true)
 console.log(products);
 
  
  const nav=useNavigate()
  const[favList,setFavList]=useState([])
 
  
  const{setPostDetails}=useContext(PostContext)
  const user = JSON.parse(localStorage.getItem('user'));
  const userId=user?user._id:null
  const fetchFavoriteList=async()=>{
    try {
      const res=await axios.get(`https://mindhill-7.onrender.com/api/v1/product/favoritelist/${userId}`)
      setFavList(res.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchFavoriteList()
  },[])
  
  
  
  
  
  
 
  
  
  const productIcons = [
    { src: pIcon1, category: "Show All" },
    { src: pIcon2, category: "Butter & Eggs" },
    { src: pIcon3, category: "Fresh Meat" },
    { src: pIcon4, category: "Milk & Cream" },
    { src: pIcon5, category: "Season Fruit" },
    { src: pIcon6, category: "Vegtables" },
  ];
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://mindhill-7.onrender.com/api/v1/product/get-product/'
      );
      setProducts(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  
  const star= ["☆", "☆", "☆", "☆", "☆"]

  const filteredProducts=products.filter((filter)=>{
    return(filter.category===bgColor)
  })

  const addtoFav=async(productId)=>{

    try {
      const res=await axios.post('https://mindhill-7.onrender.com/api/v1/product/add-fav',{userId,productId})
      console.log(res.data);
      if(res.data.success){
       
        fetchFavoriteList()
    
      }
      
    } catch (error) {
      window.alert(error.response.data.message);
      
    }
  }


  const removeFav=async(productId)=>{

    try {
      const res=await axios.post('https://mindhill-7.onrender.com/api/v1/product/remove-fav',{userId,productId})
      console.log(res.data);
      if(res.data.success){
      
        fetchFavoriteList()
    
      }
      
    } catch (error) {
      window.alert(error.response.data.error);
      
    }
  }
  
  
  return (
    <div>
      <div>
        <div className=" py-[4%] px-[10%]">
          <h2 className="font-AbrilRegular text-[60px] max-[550px]:text-[45px] max-[450px]:text-[40px] text-[#244262]">
            New Products
          </h2>
          <p className="font-gorditaRegular text-[#848484]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
        </div>
        <div className="grid grid-cols-6 max-md:grid-cols-3 max-sm:grid-cols-2 px-[4%] max-[450px]:px-[10%] gap-y-10 ">
       
          {productIcons.map((icon, index) => {
            return (
              <div
                onClick={() => setBgColor(icon.category)}
                className={`${
                  index < 5
                    ? "border-r-[1px] border-r-gray-200 border-solid"
                    : ""
                } py-[12%] cursor-pointer ${
                  bgColor === icon.category ? "bg-[#94C4F7]" : ""
                }`}
              >
                <div>
                  <img className="mx-auto" src={icon.src} alt="" />
                </div>
                <h4 className="font-gorditaRegular text-[#848484]">
                  {icon.category}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
      {isLoading? <div className="h-[400px] max-[450px]:h-[300px] flex justify-center items-center">
        <img src={loading} alt="" className="mx-auto h-[100px] max-[550px]:h-[50px] max-[400px]:h-[25px]" />
      </div>:null}
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 p-[4%] max-[450px]:p-[10%] gap-12 ">
      

        { bgColor==="Show All" ?(products.map((product) => {
          return (
            <div 
              style={{
                background: `url(${product.img1}) center/cover`,
              }}
              className="relative h-[500px] max-[1200px]:h-[400px] "
            >
              {/* <div>
                    <img src={product.src} alt="" />
                </div> */}
                <div onClick={()=>{nav(`/${product._id}`)}} className="h-[77%]" >

                </div>
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
                      ₹{product.price}
                    </h4>
                    <h4 className="ml-[17%] text-[#FFA27E] ">
                      {" "}
                      ₹{product.offerPrice}
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
                    <div  className="bg-[#FFA27E] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                      {favList.includes(product._id)?(<FontAwesomeIcon onClick={()=>removeFav(product._id)}  icon={faHeartSolid} className="h-[18px] " />):(<FontAwesomeIcon onClick={()=>addtoFav(product._id)} icon={faHeart} className="h-[18px] " />)}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })):(filteredProducts.map((product) => {
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
                <div onClick={()=>{nav(`/${product._id}`)}} className="h-[77%]" >
                </div>
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
                    <div  className="bg-[#FFA27E] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                      {favList.includes(product._id)?(<FontAwesomeIcon onClick={()=>removeFav(product._id)}  icon={faHeartSolid} className="h-[18px] " />):(<FontAwesomeIcon onClick={()=>addtoFav(product._id)} icon={faHeart} className="h-[18px] " />)}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })) }
      </div>
      <button className="bg-[#94C4F7] py-[1%] px-[3%] font-gorditaMedium mx-auto text-white">
        LOAD MORE
      </button>
    </div>
  );
};

export default Products;
