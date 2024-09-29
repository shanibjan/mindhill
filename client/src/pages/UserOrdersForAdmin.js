import React, { useEffect, useState } from "react";
import p11 from "../images/product-11.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UserOrdersForAdmin = () => {

  const [order,setOrder]=useState([])
  console.log(order);
  const location=useLocation()
  
  
  
const userId=location.state.userId
  const fetchorder=async()=>{
      const res=await axios.get(`api/v1/product/get-order/${userId}`)
      setOrder(res.data);
      
     
      
  }

  useEffect(()=>{
    fetchorder()
  },[])
  return (
    <div className="px-[3%]">
      <div>
        <h2 className="font-gorditaMedium">User:Shanib Jan</h2>
        <div>
          <div>
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
              <h1 className="text-left font-AbrilRegular text-[#244262] text-[30px] p-[2%]" >Order No:{index+1}</h1>

              {items.product.map((item)=>{
              
                
                return(
                  <div className="flex justify-between text-left py-[1%] text-[16px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]">
                <div className="w-[5%]"></div>
                <div className="w-[10%] p-[1%]">
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
                    <div className="py-[15px] px-[25px] bg-[#EBF5FF] font-gorditaRegular">
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
              

              

              <div className="flex justify-evenly font-gorditaMedium mt-[5%] ">
                <div className="w-[30%] text-left" >
                  <h2>Delivery Address:</h2>
                  <div className="font-gorditaRegular" >
                    <p>{items.address}</p>
                  </div>
                </div>
                <h2>Status:{items.status}</h2>
                <div>
                  <div className="flex">
                    <h2>Change Status</h2>
                    <select className="bg-[#EBF5FF]" name="" id="">
                      <option value=""></option>
                      <option value="">Order Placed</option>
                      <option value="">Shipped</option>
                      <option value="">Delivered</option>
                    </select>
                  </div>
                  <button className="bg-[#94C4F7] py-[3%] px-[5%] font-gorditaBold text-[12px] tracking-[2px] m-[10%]  text-white ">
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
