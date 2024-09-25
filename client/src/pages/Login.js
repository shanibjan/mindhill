import React, { useEffect, useState } from "react";
import LoginHeader from "../components/LoginHeader";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const nav=useNavigate()
   
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

      const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const login=async()=>{
      try {
        const res=await axios.post('/api/v1/auth/login',{email,password})
          console.log(res.data);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          if(res.data.success){
            window.alert(res.data.message)
            nav('/')
        }else{
            window.alert(res.data.message)
        }
        
      } catch (error) {
        window.alert(error.response.data.error);
      }
  }
  return (
    <div>
     
        <LoginHeader prop={"Login"} />
      

      <div className="mb-[4%] mt-[14%]">
        <h1 className="text-[40px] font-AbrilRegular text-[#244262]">
          User Login
        </h1>
        <h4 className="text-[30px] font-gorditaRegular text-[#244262] my-[4%] ">
          Provide User information here
        </h4>
        <input
          className="bg-[#EBF5FF] w-[30%] py-[1%] px-[2%] mb-[2%]"
          type="email"
          placeholder="Email"
          value={email} onChange={(e)=>setEmail(e.target.value)}
        />
        <br />
        <input
          className="bg-[#EBF5FF] w-[30%] py-[1%] px-[2%] mb-[2%]"
          type="password"
          placeholder="Password"
          value={password} onChange={(e)=>setPassword(e.target.value)}
        />
        <br />

        <button onClick={login} className="bg-[#94C4F7] py-[1%] px-[5%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%]  text-white">
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

export default Login;
