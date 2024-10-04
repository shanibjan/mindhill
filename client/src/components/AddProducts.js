import React, { useState } from 'react';
import axios from 'axios'

const AddProducts = ({ }) => {
    const [image, setImage] = useState([]);
    const[name,setName]=useState()
    const[category,setCategory]=useState()
    const[price,setPrice]=useState()
    const[offerPrice,setOfferPrice]=useState()
    const[rating,setRating]=useState()
    
    
   
    
    const store = (e) => {
        let val = e.target.files[0];
    
      
        const reader = new FileReader();
        reader.readAsDataURL(val);
       
        reader.addEventListener("load", () => {
          let imageLoader = reader.result;
         
          setImage((stateCopy) => {
            return [...stateCopy, { loader: imageLoader }];
          });
        });
      };


      const create=async()=>{
          try {
            const res=await axios.post('https://mindhill-7.onrender.com/api/v1/product/add-product',{name,category,price,offerPrice,rating,img1:image[0].loader,img2:image[1].loader,img3:image[2].loader,img4:image[3].loader})
            console.log(res.data);
            if(res.data.success){
              setImage([])
              window.alert(res.data.message)
              window.location.reload(); 
             
          }else{
              window.alert(res.data.message)
          }

          } catch (error) {
            console.log(error);
            
          }
      }
  return (
    <div className='my-[10%]' >
      <h1 className="text-[40px] font-AbrilRegular max-[550px]:text-[30px] max-[370px]:text-[25px] text-[#244262]">
          Add Products
        </h1>
        <div className='w-[50%] max-[750px]:w-[80%] max-[500px]:w-[100%] max-[650px]:text-[13px] mx-auto' >
        <input
          className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
          type="text"
          placeholder="Product Name"
          value={name} onChange={(e)=>setName(e.target.value)}
        />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className='p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular' name="" id="">
            <option value="">Category</option>
            <option value="Butter & Eggs">Butter & Eggs</option>
            <option value="Fresh Meat">Fresh Meat</option>
            <option value="Milk & Cream">Milk & Cream</option>
            <option value="Season Fruit">Season Fruit</option>
            <option value="Vegtables">Vegtables</option>
          </select>
        <br />
        <input
          className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
          type="number"
          placeholder="MRP"
          value={price} onChange={(e)=>setPrice(e.target.value)}
        />
        <br />
        <input
          className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
          type="number"
          placeholder="Discount Price"
          value={offerPrice} onChange={(e)=>setOfferPrice(e.target.value)}
        />
        <br />
        <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            className='p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular' 
            onChange={store}
          />
          <br />
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            className='p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular' 
            onChange={store}
          />
          <br />
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            className='p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular' 
            onChange={store}
          />
          <br />
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            className='p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular' 
            
            onChange={store}
          />
          <br />
          <select  value={rating} onChange={(e)=>setRating(e.target.value)} className='p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular' name="" id="">
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <button onClick={create} className="bg-[#94C4F7] py-[3%] px-[10%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%]  text-white">
          ADD PRODUCT
        </button>
        </div>
        

    </div>
  );
};

export default AddProducts;