import React, { useEffect, useState } from 'react';
import p11 from "../images/product-11.jpg";
import p12 from "../images/product-12.jpg";
import p13 from "../images/product-13.jpg";
import p14 from "../images/product-14.jpg";
import p15 from "../images/product-15.jpg";
import p16 from "../images/product-16.jpg";
import axios from 'axios';

const AdminProducts = ({ }) => {
  const [products,setProducts]=useState([])
  console.log(products);
  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://mindhill-7.onrender.com/api/v1/product/get-product/'
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])
    
  return (
    <div>
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 p-[4%] gap-12 ">
        {products.map((product) => {
         
          
          return (
            <div
              style={{
                background: `url(${product.img1}) center/cover`,
              }}
              className="relative h-[500px] max-[900px]:h-[300px]  "
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