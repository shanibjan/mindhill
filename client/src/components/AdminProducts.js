import React from 'react';
import p11 from "../images/product-11.jpg";
import p12 from "../images/product-12.jpg";
import p13 from "../images/product-13.jpg";
import p14 from "../images/product-14.jpg";
import p15 from "../images/product-15.jpg";
import p16 from "../images/product-16.jpg";

const AdminProducts = ({ }) => {
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
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProducts;