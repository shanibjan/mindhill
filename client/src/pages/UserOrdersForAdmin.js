import React, { useEffect, useState } from "react";
import p11 from "../images/product-11.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UserOrdersForAdmin = () => {

  const [order,setOrder]=useState([])
  console.log(order);
  const location=useLocation()
  const [status,setStatus]=useState("")
  
  
const userId=location.state.userId
  const fetchorder=async()=>{
      const res=await axios.get(`https://mindhill-7.onrender.com/api/v1/product/get-order/${userId}`)
      setOrder(res.data);
      
     
      
  }
  const updateStatus=async(orderId)=>{
    try {
      const res=await axios.put(`https://mindhill-7.onrender.com/api/v1/product/update-orders/${orderId}`,{status})
      console.log(res.data);
      fetchorder()
      setStatus("")
      
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message)
    }
  }

  useEffect(()=>{
    fetchorder()
  },[])

  order.sort((a, b) =>   new Date(b.createdAt)-new Date(a.createdAt));
  return (
    <div className="px-[3%]">
      <div>
        <h2 className="font-gorditaMedium">User:Shanib Jan</h2>
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
           {order.map((items,index)=>{
            console.log(items);
            
            return(
              <div className=" border-[1px] border-gray-300 shadow-lg mb-[4%]">
              <h1 className="text-left font-AbrilRegular text-[#244262] text-[30px] max-[550px]:text-[20px] p-[2%]" >Order No:{index+1}</h1>

              {items.product.map((item)=>{
              
                
                return(
                  <div className="flex justify-between text-left py-[1%] text-[16px] max-[550px]:text-[13px] max-[470px]:text-[12px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]">
                <div className="w-[5%] max-[550px]:w-[2%]"></div>
                <div className="w-[10%] p-[1%] max-[550px]:hidden">
                  <img src={item.img1} alt="" />
                </div>
                <div className="w-[25%]">
                  <h1>{item.name}</h1>
                </div>
                <div className="w-[20%]">
                  <h1>₹{item.offerPrice*item.quantity}</h1>
                </div>
                <div className="w-[20%]">
                  <div className="flex items-center h-[54px] ">
                    <div className="py-[15px] px-[25px]  max-[550px]:py-[12px] max-[550px]:px-[20px] max-[400px]:py-[10px] max-[400px]:px-[15px] bg-[#EBF5FF] font-gorditaRegular">
                      <h3>{item.quantity}</h3>
                    </div>
                  </div>
                </div>
                <div className="w-[20%]">
                  <h1>{items.status}</h1>
                </div>
              </div>
                )
              })}
              

              

              <div className="flex justify-evenly font-gorditaMedium mt-[5%]  max-[550px]:text-[12px] max-[400px]:text-[10px] max-[1000px]:block ">
                <div className="w-[30%] text-left max-[1000px]:text-center max-[1000px]:w-full" >
                  <h2>Delivery Address:</h2>
                  <div className="font-gorditaRegular" >
                    <p>{items.address}</p>
                  </div>
                </div>
                <h2 className="max-[1000px]:my-[4%]" >Status:{items.status}</h2>
                <div>
                  <div className="flex max-[1000px]:justify-center">
                    <h2>Change Status</h2>
                    <select onChange={(e)=>setStatus(e.target.value)} className="bg-[#EBF5FF]" name="" id="">
                      <option value=""></option>
                      <option value="Order Placed">Order Placed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <button onClick={()=>updateStatus(items._id)} className="bg-[#94C4F7] py-[3%] px-[5%] font-gorditaBold text-[12px] tracking-[2px] m-[10%]  text-white ">
                    UPDATE STATUS
                  </button>
                </div>
                <div>
                  <h2>Total bill: ₹{items.bill} /-</h2>
                </div>
              </div>
            </div>
            )
           })}
            


            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersForAdmin;
