import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ManageUserOrders = () => {
  const [order,setOrder]=useState([])
  console.log(order);
  
  const nav=useNavigate()
  const fetchorder=async()=>{
    const res=await axios.get(`https://mindhill-7.onrender.com/api/v1/product/get-ordered-users`)
    setOrder(res.data[0].users);
    
   
    
}

useEffect(()=>{
  fetchorder()
},[])


  return (
    <div className="grid grid-cols-3 gap-4 my-[5%] max-lg:grid-cols-2 max-md:grid-cols-1" >
      {order.map((user)=>{
        return(
          <div className="shadow-lg flex items-center justify-center h-[200px]">
          <div className=" font-gorditaMedium">
            <div className="text-left" >
              <h2>Username : {user.name}</h2>
              <h2>User email : {user.email}</h2>
              <h2>Phone : {user.phone}</h2>
            </div>
  
            <button onClick={()=>nav('/user_orders_for_admin',{state:{userId:user._id}})} className="bg-[#94C4F7] py-[3%] px-[5%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%]  text-white ">
              VIEW/MANAGE ORDERS
            </button>
          </div>
        </div>
        )
      })}
     
      
    </div>
  );
};

export default ManageUserOrders;
