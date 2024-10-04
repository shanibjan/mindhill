import React, { useEffect, useState } from "react";
import userimg from "../images/user.png";
import axios from 'axios'
const Reviews = (props) => {
  
  
  
  const[rating,setRating]=useState()
  const[review,setReview]=useState([])
  const[addReview,setAddReview]=useState()
  
  
  const stars= ["✩", "✩", "✩", "✩", "✩"]
  const user = JSON.parse(localStorage.getItem('user'));
  
  
  const productId=props.productId
  const name=user?user.name:""
 const email=user?user.email:""
 const profile=user?user.profile:""
  

  const fetchData=async()=>{
    const res=await axios.get(`https://mindhill-7.onrender.com/api/v1/product/get-review/${productId}`)
    setReview(res.data);
    
  }
  useEffect(()=>{
    fetchData()
  },[])
  

  const submit=async()=>{
    try {
      
      const res=await axios.post('https://mindhill-7.onrender.com/api/v1/product/add-review',{name,email,review:addReview,rating,productId,profile})
      console.log(res.data);
      if(res.data.success){
        window.alert(res.data.message)
        fetchData()
      }
      
      
    } catch (error) {
        window.alert(error.response.data.message);
        
      
    }
  }
  return (
    <div className="py-[3%] px-[15%]">
      <div className="pb-[3%] border-b-[1px] border-b-gray-300 ">
        <div className="text-[35px] max-[650px]:text-[27px] max-[400px]:text-[24px] font-AbrilRegular text-left mb-[4%] text-[#244262]">
          <h2>{review.length}  review for {props.name}</h2>
        </div>
        <div>
          {review.map((rev)=>{
            
            
            return(
              <div className="flex justify-between items-center my-[8%]">
              <div className=" w-[70px] h-[70px]">
                <img className="w-full h-full object-cover rounded-[50%]" src={rev.profile?rev.profile:userimg} alt="" />
              </div>
  
              <div className=" ml-[4%] text-left leading-[30px] font-gorditaRegular text-[#244262] w-[85%] max-[900px]:w-[80%] max-[600px]:w-[75%] max-[450px]:w-[70%] max-[400px]:w-[65%] ">
              <div className="grid grid-cols-5 gap-x-2 w-[15%] max-[650px]:w-[40%]">
                    {stars.map((s, i) => {
                      return <p>{i < rev.rating ? "★" : s}</p>;
                    })}
                  </div>
                <h3 className="text-[20px] font-gorditaMedium ">
                  {rev.name}
                </h3>
               
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
          <h1 className="text-[35px]  max-[450px]:text-[27px]  text-left ">Add a review</h1>
          <div className="flex items-center my-[3%]">
            <h3 className="text-[23px] max-[450px]:text-[17px] mr-[2%] max-[850px]:mr-[7%]">Your rating</h3>
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
          
          <button onClick={submit} className="bg-[#94C4F7] my-[2%] py-[1%] px-[3%] max-[450px]:py-[4%] max-[450px]:px-[8%] font-gorditaMedium mx-auto text-white">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
