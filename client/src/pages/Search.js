import { faShoppingBag,faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PostContext } from '../store/postContext';

const Search = ({ }) => {
    const location=useLocation()
    console.log(location.state);
    const[products,setProducts]=useState([])
    const nav=useNavigate()
    const[favList,setFavList]=useState([])
  const{setPostDetails}=useContext(PostContext)
    const user = JSON.parse(localStorage.getItem('user'));
    const userId=user?user._id:null
    const fetchFavoriteList=async()=>{
      try {
        const res=await axios.get(`api/v1/product/favoritelist/${userId}`)
        setFavList(res.data);
        
      } catch (error) {
        console.log(error);
        
      }
    }
  
    
    const fetchSearch=async()=>{
        try {
            const res=await axios.get(`api/v1/product/search?q=${location.state}`)
            setProducts(res.data);
            
        } catch (error) {
            
        }
    }

    const star= ["☆", "☆", "☆", "☆", "☆"]
 const addtoFav=async(productId)=>{

    try {
      const res=await axios.post('api/v1/product/add-fav',{userId,productId})
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
      const res=await axios.post('api/v1/product/remove-fav',{userId,productId})
      console.log(res.data);
      if(res.data.success){
      
        fetchFavoriteList()
    
      }
      
    } catch (error) {
      window.alert(error.response.data.error);
      
    }
  }
    useEffect(()=>{
        fetchSearch()
        fetchFavoriteList()
    },[])
    
  return (
    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 p-[4%] gap-12 ">
        {
            (products.map((product) => {
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
                      <div onClick={()=>{setPostDetails(product);nav('/overview')}} className="h-[77%]" >
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
              }))
        }
    </div>
  );
};

export default Search;