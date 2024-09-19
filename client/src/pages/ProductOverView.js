import React, { useState } from "react";
import ProductHeader from "../components/ProductHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import p11 from "../images/product-11.jpg";
import p111 from "../images/product-11-1.jpg";
import p112 from "../images/product-11-2.jpg";
import p113 from "../images/product-11-3.jpg";
import Reviews from "../components/Reviews";

const ProductOverView = () => {
  const [image, setImage] = useState(p11);
  const [qty, setQty] = useState(1);
  const [bg, setBg] = useState("Description");

  return (
    <div>
      <ProductHeader />
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-16 py-[5%] px-[10%]">
        <div className="grid grid-row-2">
          <div className="h-full">
            <img className="h-full object-cover" src={image} alt="" />
          </div>
          <div className="flex items-end">
            <div className="grid grid-cols-3 gap-[3%] mt-[3%]">
              <img onMouseEnter={() => setImage(p111)} src={p111} alt="" />
              <img onMouseEnter={() => setImage(p112)} src={p112} alt="" />
              <img onMouseEnter={() => setImage(p113)} src={p113} alt="" />
            </div>
          </div>
        </div>
        <div className="text-left flex items-center ">
          <div>
            <h1 className="text-[40px] font-AbrilRegular text-[#244262] ">
              Spinach
            </h1>
            <div className="flex font-gorditaRegular my-[3%] text-[#244262]  ">
              <h4>★★★★★</h4>
              <h4>(1 Customer review)</h4>
            </div>
            <div className="flex justify-start font-AbrilRegular text-[30px] ">
              <h4 className="line-through text-[#244262] ">$3</h4>
              <h4 className="ml-[17%] text-[#FFA27E] "> $4</h4>
            </div>
            <p className="font-gorditaRegular text-[15px] text-gray-500 my-[5%] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At iure
              voluptatibus quo nam cum sint labore commodi eos, nostrum
              explicabo? Temporibus perspiciatis doloribus cupiditate nobis
              necessitatibus magni eius, sit nulla.
            </p>
            <div className="flex">
              <div className="flex items-center mr-[1%] ">
                <div className="py-[15px] px-[25px] bg-[#EBF5FF] font-gorditaRegular">
                  <h3>{qty}</h3>
                </div>
                <div className="grid grid-rows-2 gap-y-[3%] h-full">
                  <div
                    onClick={() => setQty(qty + 1)}
                    className="bg-[#94C4F7] w-[27px]  flex justify-center items-center"
                  >
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      className="h-[13px] text-white "
                    />
                  </div>

                  <div
                    onClick={() => (qty > 1 ? setQty(qty - 1) : null)}
                    className="bg-[#94C4F7] w-[27px]  flex justify-center items-center"
                  >
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="h-[13px] text-white "
                    />
                  </div>
                </div>
              </div>
              <button className="bg-[#94C4F7] py-[1%] px-[3%] font-gorditaMedium text-white">
                ADD TO CART
              </button>
            </div>
            <div className="flex items-center my-[5%] ">
              <div className="bg-[#94C4F7] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center text-white mr-8">
                <FontAwesomeIcon icon={faHeart} className="h-[18px] " />
              </div>
              <h4 className="font-gorditaRegular">Add to wishlist</h4>
            </div>
            <div className="leading-[50px] text-[#244262] ">
              <div className="flex">
                <h3 className="font-AbrilRegular text-[20px]  mr-[5%]">SKU:</h3>
                <p className="font-gorditaRegular">05-22</p>
              </div>
              <div className="flex">
                <h3 className="font-AbrilRegular text-[20px]  mr-[5%]">
                  Category:
                </h3>
                <p className="font-gorditaRegular">Vegtables</p>
              </div>
              <div className="flex">
                <h3 className="font-AbrilRegular text-[20px] mr-[5%]">Tags:</h3>
                <p className="font-gorditaRegular">Food,Healthy</p>
              </div>
              <div className="flex items-center">
                <h3 className="font-AbrilRegular text-[20px]  mr-[5%]">
                  Share:
                </h3>
                <div className="flex justify-between w-[50%] text-white ">
                  <div className="bg-[#94C4F7] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faFacebook} className="h-[18px] " />
                  </div>
                  <div className="bg-[#94C4F7] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faInstagram} className="h-[18px] " />
                  </div>
                  <div className="bg-[#94C4F7] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faTwitter} className="h-[18px] " />
                  </div>
                  <div className="bg-[#94C4F7] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faLinkedin} className="h-[18px] " />
                  </div>
                  <div className="bg-[#94C4F7] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faPinterest} className="h-[18px] " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 px-[10%] gap-8 text-[22px]">
          <div
            onClick={() => setBg("Description")}
            className={`${
              bg === "Description" ? "bg-[#244262]" : "bg-[#94C4F7]"
            } p-[3%] cursor-pointer font-AbrilRegular text-left text-white`}
          >
            <h4>Description</h4>
          </div>
          <div
            onClick={() => setBg("Additional Info")}
            className={`${
              bg === "Additional Info" ? "bg-[#244262]" : "bg-[#94C4F7]"
            } p-[3%] cursor-pointer font-AbrilRegular text-left text-white`}
          >
            <h4>Additional Info</h4>
          </div>
          <div
            onClick={() => setBg("Reviews (1)")}
            className={`${
              bg === "Reviews (1)" ? "bg-[#244262]" : "bg-[#94C4F7]"
            } p-[3%] cursor-pointer font-AbrilRegular text-left text-white`}
          >
            <h4>Reviews (1)</h4>
          </div>
        </div>
        {bg==="Description"?(<div className="py-[3%] px-[15%] font-gorditaRegular text-gray-500">
          <p>
            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
            Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
            Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
            ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
            tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel,
            luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
            tincidunt.
          </p>
        </div>):bg==="Additional Info"?(<div className="py-[3%] px-[15%] text-[20px]" >
            <div className="flex py-[1%] border-b-[1px] border-b-gray-200 " >
                <h2 className="w-[30%] text-left font-AbrilRegular text-[#244262]" >Weight</h2>
                <p className="font-gorditaRegular" > 1 kg </p>
            </div>
            <div className="flex py-[1%] border-b-[1px] border-b-gray-200 " >
                <h2 className="w-[30%] text-left font-AbrilRegular text-[#244262]" >Dimensions</h2>
                <p className="font-gorditaRegular" >10 × 10 × 30 cm</p>
            </div>
        </div>):(<Reviews/>)}
        
        
      </div>
    </div>
  );
};

export default ProductOverView;
