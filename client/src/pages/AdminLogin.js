import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const nav=useNavigate()
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  return (
    <div>
     
       
      

      <div className="mb-[4%] mt-[14%]">
        <h1 className="text-[40px] font-AbrilRegular text-[#244262]">
          Admin Login
        </h1>
        <h4 className="text-[30px] font-gorditaRegular text-[#244262] my-[4%] ">
          Provide Admin information here
        </h4>
        <input
          className="bg-[#EBF5FF] w-[30%] py-[1%] px-[2%] mb-[2%]"
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          className="bg-[#EBF5FF] w-[30%] py-[1%] px-[2%] mb-[2%]"
          type="password"
          placeholder="Password"
        />
        <br />

        <button className="bg-[#94C4F7] py-[1%] px-[5%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%]  text-white">
          LOGIN
        </button>
        <h4 onClick={()=> nav('/signup')} className="text-[20px] font-gorditaMedium text-[#244262] cursor-pointer my-[3%]">
          Go to Register page
        </h4>
        <h4 className="text-[20px] font-gorditaMedium text-[#244262] ">
          Go to Home page
        </h4>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
