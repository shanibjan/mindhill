import React, { useState } from "react";
import CartHeader from "../components/CartHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import p11 from "../images/product-11.jpg";

const Cart = () => {
    const[radio,setRadio]=useState()
    
    
  return (
    <div>
      <CartHeader />
      <div className="px-[10%] py-[5%]">
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

          <div className="flex justify-between text-left py-[1%] text-[16px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]">
            <div className="w-[5%]">
              <div className=" cursor-pointer h-[100px] flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="h-[28%] text-[#244262] "
                />
              </div>
            </div>
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
                <div className="grid grid-rows-2 gap-y-[3%] h-full">
                  <div className="bg-[#94C4F7] w-[27px]  flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      className="h-[13px] text-white "
                    />
                  </div>

                  <div className="bg-[#94C4F7] w-[27px]  flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="h-[13px] text-white "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[20%]">
              <h1>$3</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-between my-[5%]">
          <div className="flex justify-between w-[35%] ">
            <input
              className="bg-[#EBF5FF]  p-[2%]"
              type="text"
              placeholder="Coupon code"
            />
            <button className="bg-[#94C4F7] py-[4%] px-[10%] font-gorditaBold text-[12px] tracking-[2px]  text-white">
              ADD COUPON
            </button>
          </div>
          <div className="w-[30%] text-end">
            <button className="bg-[#94C4F7] py-[4%] px-[10%] font-gorditaBold text-[12px] tracking-[2px]  text-white">
              PROCEED TO PAY
            </button>
          </div>
        </div>


        <div className="font-AbrilRegular text-[#244262]">
        <h1 className="text-[30px] text-left ">Delivery Address</h1>
          <textarea
            className="bg-[#EBF5FF] w-full h-[300px] font-gorditaRegular p-[2%]"
            name=""
            id=""
            placeholder="Delivery Address here"
          ></textarea>
          
          
        </div>

        <div>
          <h1 className="font-AbrilRegular text-[30px] text-left text-[#244262] my-[3%]" >Cart Totals</h1>
          <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%]" >
            <h4 className="w-[30%] font-AbrilRegular text-[#244262] text-[18px]" >Subtotal</h4>
            <h5 className="w-[70%] font-gorditaRegular text-[18px]" >$3</h5>
          </div>
          <div className="flex text-left items-center border-b-[1px] border-b-gray-200 py-[2%] " >
            <h4 className="w-[30%] font-AbrilRegular text-[#244262] text-[18px]" >Payment Method</h4>
            <div className="w-[70%] font-gorditaRegular text-[18px]" >
              <input onChange={(e)=>setRadio(e.target.value)} type="radio" checked={"COD"===radio} value="COD" /> <label htmlFor="">Cash On Delivery</label> <br />
              <input onChange={(e)=>setRadio(e.target.value)} type="radio" checked={"ONLINE"===radio} value="ONLINE" /> <label htmlFor="">Online Payment</label>
            </div>
          </div>
          <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] " >
            <h4 className="w-[30%] font-AbrilRegular text-[#244262] text-[18px]" >Total</h4>
            <h5 className="w-[70%] font-gorditaRegular text-[18px]" >$3</h5>
          </div>
          <button className="bg-[#94C4F7] py-[2%] px-[3%] my-[2%] font-gorditaBold text-[12px] tracking-[2px]  text-white">
              PROCEED TO CHECKOUT
            </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
