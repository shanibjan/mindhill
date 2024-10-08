import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const nav=useNavigate()
    const { pathname } = useLocation();
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

      const login=()=>{
          if(email==="admin"&&password==="1"){
            nav('/admin',{state:{email:"admin",password:"1"}})
          }else{
            window.alert("invalid details")
          }
      }
  return (
    <div>
     
       
      

     <div className="mb-[4%] mt-[14%] ">
     <h1 className="text-[40px] max-[550px]:text-[30px] max-[370px]:text-[25px] font-AbrilRegular text-[#244262]">
          Admin Login
        </h1>
        <h4 className="text-[30px] max-[550px]:text-[20px] max-[370px]:text-[15px] font-gorditaRegular text-[#244262] my-[4%] ">
          Provide Admin information here
        </h4>
        <input
          className="bg-[#EBF5FF] w-[30%] max-[750px]:w-[50%] max-[500px]:w-[60%] py-[1%] px-[2%] mb-[2%]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <br />
        <input
          className="bg-[#EBF5FF] w-[30%] max-[750px]:w-[50%] max-[500px]:w-[60%] py-[1%] px-[2%] mb-[2%]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <br />

        <button onClick={login} className="bg-[#94C4F7] py-[1%] px-[5%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%]  text-white">
          LOGIN
        </button>
       
        <h4 onClick={()=> nav('/')} className="text-[20px] max-[450px]:text-[15px] font-gorditaMedium text-[#244262] ">
          Go to Home page
        </h4>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
