import React from "react";
import p11 from "../images/product-11.jpg";

const UserOrdersForAdmin = () => {
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
                <h1>Subtotal</h1>
              </div>
            </div>

            <div className=" border-[1px] border-gray-300 shadow-lg mb-[4%]">
              <h1 className="text-left font-AbrilRegular text-[#244262] text-[30px] p-[2%]" >Order No:1</h1>
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
                  <h1>$3</h1>
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
                  <h1>$3</h1>
                </div>
              </div>

              <div className="flex justify-evenly font-gorditaMedium mt-[5%] ">
                <h2>Status:Order Placed</h2>
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
              </div>
            </div>


            <div className=" border-[1px] border-gray-300 shadow-lg">
              <h1 className="text-left font-AbrilRegular text-[#244262] text-[30px] p-[2%]" >Order No:1</h1>
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
                  <h1>$3</h1>
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
                  <h1>$3</h1>
                </div>
              </div>

              <div className="flex justify-evenly font-gorditaMedium mt-[5%] ">
                <h2>Status:Order Placed</h2>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersForAdmin;
