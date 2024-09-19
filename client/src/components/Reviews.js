import React, { useState } from "react";
import user from "../images/user-img-1.webp";
const Reviews = () => {
  const stars = ["☆", "☆", "☆", "☆", "☆"];
  const[rating,setRating]=useState(0)
  console.log(rating);
  
  return (
    <div className="py-[3%] px-[15%]">
      <div className="pb-[3%] border-b-[1px] border-b-gray-300 ">
        <div className="text-[35px] font-AbrilRegular text-left mb-[4%] text-[#244262]">
          <h2>1 review for Spinach</h2>
        </div>
        <div>
          <div className="flex items-center">
            <div className="mr-[2%] w-[150px]">
              <img src={user} alt="" />
            </div>

            <div className="text-left leading-[30px] font-gorditaRegular text-[#244262]">
              <div>
                <p>☆☆☆☆☆</p>
              </div>
              <h3 className="text-[25px] font-AbrilRegular mb-[2%] ">
                Maria Lorene
              </h3>
              <h4>6.Aug 2019.</h4>
              <p className="text-gray-500">
                Alienum phaedrum torquatos nec eu, vis detraxit periculis ex,
                nihil expetendis in mei. Mei an pericula. lorem ipsum sit dollar
                amet euripidis, hinc partem ei est. Eos ei nisl graecis, vix
                aperiri.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="font-AbrilRegular text-[#244262] ">
          <h1 className="text-[35px] text-left ">Add a review</h1>
          <div className="flex items-center my-[3%]">
            <h3 className="text-[23px] mr-[2%]">Your rating</h3>
            <div className="grid grid-cols-5 gap-x-2">
              {stars.map((star,index) => {
                return <p className="cursor-pointer" onClick={()=>setRating(index+1)} >{index<rating?"★":star}</p>;
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
          ></textarea>
          <br />
          <input
            className="bg-[#EBF5FF] w-full p-[2%] mb-[8px]"
            type="text"
            placeholder="Name"
          />
          <br />
          <input
            className="bg-[#EBF5FF] w-full p-[2%]"
            type="email"
            placeholder="Email"
          />
          <button className="bg-[#94C4F7] my-[2%] py-[1%] px-[3%] font-gorditaMedium mx-auto text-white">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
