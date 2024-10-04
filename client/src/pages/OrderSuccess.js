import React from 'react';
import Confetti from "react-confetti";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SuccessOrder = () => {
    const nav=useNavigate()
  return (
    <div>
       <div className='mt-[10%] max-[550px]:mt-[20%] max-[470px]:p-[5%]' >
        <motion.h1 initial={{x:-1600,}} animate={{x:0}} transition={{delay:1,duration: 7,type:'spring',stiffness:20}} className='font-AbrilRegular text-[#244262] text-[35px]  max-[420px]:text-[30px]' >Your Order Succesfull ,enjoy your shopping..!</motion.h1>
        <motion.div initial={{x:-1600,}} animate={{x:0}} transition={{delay:2,duration: 7,type:'spring',stiffness:20}} className='flex max-[470px]:inline-block justify-evenly mt-[5%]' >
            <button onClick={()=>nav('/')} className='bg-[#244262]  max-[470px]:py-[5%]  max-[470px]:px-[10%] py-[2%] px-[5%] font-gorditaRegular text-white   max-[470px]:mb-[10%]' >Go to shopping page</button>
            <button onClick={()=>nav('/user_orders')} className='bg-[#244262]  max-[470px]:py-[5%]  max-[470px]:px-[10%] py-[2%] px-[5%] font-gorditaRegular text-white' >Go to your orders</button>
        </motion.div>
       </div>
       <Confetti className='h-[600px]'/>
    </div>
  );
};

export default SuccessOrder;