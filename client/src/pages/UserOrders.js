import React from 'react';
import p11 from "../images/product-11.jpg";

const UserOrders = () => {
  return (
   
        <div>
            <h1 className='font-AbrilRegular text-[#244262] text-[40px] my-[5%]' >User Orders</h1>
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
                <h1>Status</h1>
              </div>
            </div>

            <div className="flex justify-between text-left py-[1%] text-[16px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px] mb-[2%]">
              <div className="w-[5%]"></div>
              <div className="w-[10%] p-[1%]">
                <img src={p11} alt="" />
              </div>
              <div className="w-[25%]">
                <h1>Spinach</h1>
              </div>
              <div className="w-[20%]">
                <h1>$3</h1>
              </div>
              <div className="w-[20%]">
                <div className="flex items-center h-[54px] ">
                  <div className="py-[15px] px-[25px] bg-[#EBF5FF] font-gorditaRegular">
                    <h3>1</h3>
                  </div>
                </div>
              </div>
              <div className="w-[20%]">
                <h1>Delivered</h1>
              </div>
            </div>

            <div className="flex justify-between text-left py-[1%] text-[16px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]">
              <div className="w-[5%]"></div>
              <div className="w-[10%] p-[1%]">
                <img src={p11} alt="" />
              </div>
              <div className="w-[25%]">
                <h1>Spinach</h1>
              </div>
              <div className="w-[20%]">
                <h1>$3</h1>
              </div>
              <div className="w-[20%]">
                <div className="flex items-center h-[54px] ">
                  <div className="py-[15px] px-[25px] bg-[#EBF5FF] font-gorditaRegular">
                    <h3>1</h3>
                  </div>
                </div>
              </div>
              <div className="w-[20%]">
                <h1>Shipped</h1>
              </div>
            </div>
          </div>
        </div>

   
  );
};

export default UserOrders;