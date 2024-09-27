import React, { useEffect, useState } from "react";
import LoginHeader from "../components/LoginHeader";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

const Signup = () => {
  const [image, setImage] = useState([]);
  console.log(image);
  
  
    const nav=useNavigate()
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

     
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [phone,setPhone]=useState()

    const register=async()=>{
        try {
          const res=await axios.post('/api/v1/auth/register',{name,email,password,phone,profile:image})
            console.log(res.data);
            if(res.data.success){
              window.alert(res.data.message)
            nav('/login')
          }else{
              window.alert(res.data.message)
          }
          
        } catch (error) {
          window.alert(error.response.data.error);
        }
    }


    const store = (e) => {
      let val = e.target.files[0];
  
    
      const reader = new FileReader();
      reader.readAsDataURL(val);
     
      reader.addEventListener("load", () => {
        let imageLoader = reader.result;
       
        setImage(imageLoader);
      });
    };
  return (
    <div>
     
        <LoginHeader prop={"Register"} />
      

      <div className="mb-[4%] mt-[14%]">
        <h1 className="text-[40px] font-AbrilRegular text-[#244262]">
          User Registration
        </h1>
        <h4 className="text-[30px] font-gorditaRegular text-[#244262] my-[4%] ">
          Provide User information here
        </h4>
        <div>
          
        </div>
        <input
          className="bg-[#EBF5FF] w-[30%] py-[1%] px-[2%] mb-[2%]"
          type="text"
          placeholder="Username"
          value={name} onChange={(e)=>setName(e.target.value)}
        />
        <br />
        <input
          className="bg-[#EBF5FF] w-[30%] py-[1%] px-[2%] mb-[2%]"
          type="email"
          placeholder="Email"
          value={email} onChange={(e)=>setEmail(e.target.value)}
        />
        <br />
        <input
          className="bg-[#EBF5FF] w-[30%] py-[1%] px-[2%] mb-[2%]"
          type="number"
          placeholder="Phone"
          value={phone} onChange={(e)=>setPhone(e.target.value)}
        />
        <br />
        <div className="w-[30%] mx-auto text-left font-gorditaRegular text-gray-400 " >

        <label htmlFor="">Add your Profile</label> 
        </div><br />
        <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            className='px-[.6%] py-[1%] bg-[#EBF5FF]  w-[30%]  mb-[2%] font-gorditaRegular' 
            onChange={store}
          /> <br />
        <input
          className="bg-[#EBF5FF] w-[30%] py-[1%] px-[2%] mb-[2%]"
          type="password"
          placeholder="Password"
          value={password} onChange={(e)=>setPassword(e.target.value)}
        />
        <br />

        <button onClick={register}  className="bg-[#94C4F7] py-[1%] px-[5%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%]  text-white">
          REGISTER
        </button>
        <h4 onClick={()=> nav('/login')} className="text-[20px] font-gorditaMedium text-[#244262] my-[3%] cursor-pointer">
          Go to Login page
        </h4>
        <h4  className="text-[20px] font-gorditaMedium text-[#244262] cursor-pointer ">
          Go to Home page
        </h4>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
