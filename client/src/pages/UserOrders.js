import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [order,setOrder]=useState([])
console.log(order);


  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const userName = user ? user.name : null;
  const fetchorder=async()=>{
    const res=await axios.get(`api/v1/product/get-order/${userId}`)
    setOrder(res.data);
    
   
    
}
order.sort((a, b) =>   new Date(b.createdAt)-new Date(a.createdAt));

useEffect(()=>{
  fetchorder()
},[])
  return (
   
        <div>
            <h1 className='font-AbrilRegular text-[#244262] text-[40px] my-[5%]' >User Orders</h1>
            <div className="px-[3%]">
      <div>
        <h2 className="font-gorditaMedium">User:{userName}</h2>
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
              

              

              <div className="flex justify-evenly font-gorditaMedium my-[5%] ">
                <div className="w-[30%] text-left" >
                  <h2>Delivery Address:</h2>
                  <div className="font-gorditaRegular" >
                    <p>{items.address}</p>
                  </div>
                </div>
                <h2>Status:{items.status}</h2>
                
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
        </div>

   
  );
};

export default UserOrders;