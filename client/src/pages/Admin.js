import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


import AdminProducts from "../components/AdminProducts";
import AddProducts from "../components/AddProducts";
import ManageUserOrders from "../components/ManageUserOrders";
import { useLocation } from "react-router-dom";


const Admin = () => {
  const [component, setComponent] = useState("Products");
  const location=useLocation()
  
  
  
  return (
    location.state ? (
      <div className="py-[5%] px-[10%]">
        <div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 text-[22px]">
            <div
              className={`${
                component === "Products" || component === "AddProducts" ? "bg-[#244262]" : "bg-[#94C4F7]"
              } p-[3%] cursor-pointer font-AbrilRegular text-white flex justify-between`}
            >
              <h4 className="w-[90%] text-left" onClick={() => setComponent("Products")}>
                Products
              </h4>
              <div onClick={() => setComponent("AddProducts")}>
                <FontAwesomeIcon icon={faPlus} className="text-white" />
              </div>
            </div>
            <div
              onClick={() => setComponent("Users")}
              className={`${
                component === "Users" ? "bg-[#244262]" : "bg-[#94C4F7]"
              } p-[3%] cursor-pointer font-AbrilRegular text-left text-white`}
            >
              <h4>Manage user orders</h4>
            </div>
          </div>
        </div>

        {/* Conditional rendering of components */}
        {component === "Products" ? (
          <AdminProducts />
        ) : component === "AddProducts" ? (
          <AddProducts />
        ) : (
          <ManageUserOrders />
        )}
      </div>
    ) : "404 not found"
  );
};

export default Admin;
