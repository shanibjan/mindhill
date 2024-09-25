import React, { useEffect, useState } from "react";
import userimg from "../images/user-img-1.webp";
import axios from 'axios'
const Reviews = ({productId}) => {
  
  const[rating,setRating]=useState()
  const[review,setReview]=useState([])
  const[addReview,setAddReview]=useState()
  
  
  const stars= ["✩", "✩", "✩", "✩", "✩"]
  const user = JSON.parse(localStorage.getItem('user'));
  
  
  
  const name=user?user.name:""
 const email=user?user.email:""
  

  const fetchData=async()=>{
    const res=await axios.get(`api/v1/product/get-review/${productId}`)
    setReview(res.data);
    
  }
  useEffect(()=>{
    fetchData()
  },[])
  

  const submit=async()=>{
    try {
      
      const res=await axios.post('api/v1/product/add-review',{name,email,review:addReview,rating,productId})
      console.log(res.data);
      if(res.data.success){
        window.alert(res.data.message)
        fetchData()
      }
      else{
        console.log("f");
        
      }
      
    } catch (error) {
        window.alert(error.response.data.error);
        
      
    }
  }
  return (
    <div className="py-[3%] px-[15%]">
      <div className="pb-[3%] border-b-[1px] border-b-gray-300 ">
        <div className="text-[35px] font-AbrilRegular text-left mb-[4%] text-[#244262]">
          <h2>{review.length} review for Spinach</h2>
        </div>
        <div>
          {review.map((rev)=>{
            
            
            return(
              <div className="flex items-center my-[8%]">
              <div className="mr-[2%] w-[150px]">
                <img src={userimg} alt="" />
              </div>
  
              <div className="text-left leading-[30px] font-gorditaRegular text-[#244262] w-[90%]">
              <div className="grid grid-cols-5 gap-x-2 w-[15%]">
                    {stars.map((s, i) => {
                      return <p>{i < rev.rating ? "★" : s}</p>;
                    })}
                  </div>
                <h3 className="text-[25px] font-AbrilRegular mb-[2%] ">
                  {rev.name}
                </h3>
                <h4>{rev.createdAt}.</h4>
                <p className="text-gray-500">
                  {rev.review}
                </p>
              </div>
            </div>
            )
            
          })}
          
        </div>
      </div>

      <div>
        <div className="font-AbrilRegular text-[#244262] ">
          <h1 className="text-[35px] text-left ">Add a review</h1>
          <div className="flex items-center my-[3%]">
            <h3 className="text-[23px] mr-[2%]">Your rating</h3>
            <div className="grid grid-cols-5 gap-x-2">
              {stars.map((star,index) => {
                return <p className="cursor-pointer" onClick={()=>setRating(index+1)} >{index<rating?"★":"☆"}</p>;
              })}
            </div>
          </div>
        </div>

        <div className="font-gorditaRegular">
          <textarea
            className="bg-[#EBF5FF] w-full h-[300px] p-[2%]"
            name=""
            id=""
            placeholder="Review"
            value={addReview}
            onChange={(e)=>setAddReview(e.target.value)}
          ></textarea>
          <br />
          
          <button onClick={submit} className="bg-[#94C4F7] my-[2%] py-[1%] px-[3%] font-gorditaMedium mx-auto text-white">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
