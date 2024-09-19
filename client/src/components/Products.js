import React, { useState } from "react";
import pIcon1 from "../images/p-icon-1.webp";
import pIcon2 from "../images/p-icon-2.webp";
import pIcon3 from "../images/p-icon-3.webp";
import pIcon4 from "../images/p-icon-4.png";
import pIcon5 from "../images/p-icon-5.webp";
import pIcon6 from "../images/p-icon-6.png";
import p11 from "../images/product-11.jpg";
import p12 from "../images/product-12.jpg";
import p13 from "../images/product-13.jpg";
import p14 from "../images/product-14.jpg";
import p15 from "../images/product-15.jpg";
import p16 from "../images/product-16.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";

const Products = () => {
  const [bgColor, setBgColor] = useState("Show All");
  console.log(bgColor);

  const productIcons = [
    { src: pIcon1, category: "Show All" },
    { src: pIcon2, category: "Butter & Eggs" },
    { src: pIcon3, category: "Fresh Meat" },
    { src: pIcon4, category: "Milk & Cream" },
    { src: pIcon5, category: "Season Fruit" },
    { src: pIcon6, category: "Vegtables" },
  ];

  const products = [
    {
      src: p11,
      name: "Leaf",
      price: "4",
      offerPrice: "3",
      star: ["☆", "☆", "☆", "☆", "☆"],
      rev: [1, 1],
    },
    {
      src: p12,
      name: "Leaf",
      price: "4",
      offerPrice: "3",
      star: ["☆", "☆", "☆", "☆", "☆"],
      rev: [1, 1, 1],
    },
    {
      src: p13,
      name: "Leaf",
      price: "4",
      offerPrice: "3",
      star: ["☆", "☆", "☆", "☆", "☆"],
      rev: [1, 1],
    },
    {
      src: p14,
      name: "Leaf",
      price: "4",
      offerPrice: "3",
      star: ["☆", "☆", "☆", "☆", "☆"],
      rev: [1],
    },
    {
      src: p15,
      name: "Leaf",
      price: "4",
      offerPrice: "3",
      star: ["☆", "☆", "☆", "☆", "☆"],
      rev: [1, 1, 1, 1, 1],
    },
    {
      src: p16,
      name: "Leaf",
      price: "4",
      offerPrice: "3",
      star: ["☆", "☆", "☆", "☆", "☆"],
      rev: [1],
    },
  ];
  return (
    <div>
      <div>
        <div className="px-[30%] py-[4%]">
          <h2 className="font-AbrilRegular text-[60px] text-[#244262]">
            New Products
          </h2>
          <p className="font-gorditaRegular text-[#848484]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
        </div>
        <div className="grid grid-cols-6 max-md:grid-cols-3 max-sm:grid-cols-2 px-[4%] gap-y-10 ">
          {productIcons.map((icon, index) => {
            return (
              <div
                onClick={() => setBgColor(icon.category)}
                className={`${
                  index < 5
                    ? "border-r-[1px] border-r-gray-200 border-solid"
                    : ""
                } py-[12%] cursor-pointer ${
                  bgColor === icon.category ? "bg-[#94C4F7]" : ""
                }`}
              >
                <div>
                  <img className="mx-auto" src={icon.src} alt="" />
                </div>
                <h4 className="font-gorditaRegular text-[#848484]">
                  {icon.category}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 p-[4%] gap-12 ">
        {products.map((product) => {
          return (
            <div
              style={{
                background: `url(${product.src}) center/cover`,
              }}
              className="relative h-[500px] "
            >
              {/* <div>
                    <img src={product.src} alt="" />
                </div> */}
              <div className="flex justify-between absolute bottom-0 w-full p-[6%]  ">
                <div className="text-left text-[#244262] ">
                  <h4 className="font-AbrilRegular text-[20px]  ">
                    {product.name}
                  </h4>
                  <p className="font-gorditaRegular">
                    ${product.offerPrice}/kg
                  </p>
                  <p className="grid grid-cols-5 gap-x-2">
                    {product.star.map((s, i) => {
                      return <p>{i < product.rev.length ? "★" : "☆"}</p>;
                    })}
                  </p>
                </div>
                <div className="w-[55%]">
                  <div className="flex justify-end font-AbrilRegular text-[20px] ">
                    <h4 className="line-through text-[#244262] ">
                      ${product.price}
                    </h4>
                    <h4 className="ml-[17%] text-[#FFA27E] ">
                      {" "}
                      ${product.offerPrice}
                    </h4>
                  </div>
                  <div className="flex justify-between text-white ">
                    <div className="bg-[#244262] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={faShoppingBag}
                        className="h-[18px]"
                      />
                    </div>
                    <div className="bg-[#94C4F7] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                      <FontAwesomeIcon icon={faEye} className="h-[18px]" />
                    </div>
                    <div className="bg-[#FFA27E] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
                      <FontAwesomeIcon icon={faHeart} className="h-[18px] " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="bg-[#94C4F7] py-[1%] px-[3%] font-gorditaMedium mx-auto text-white">
        LOAD MORE
      </button>
    </div>
  );
};

export default Products;
