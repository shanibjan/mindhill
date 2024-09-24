import React, { useState } from 'react';

const AddProducts = ({ }) => {
    const [image, setImage] = useState([]);
    console.log(image);
    
    const store = (e) => {
        let val = e.target.files[0];
    
        console.log(val);
        const reader = new FileReader();
        reader.readAsDataURL(val);
        console.log(reader);
        reader.addEventListener("load", () => {
          let imageLoader = reader.result;
          console.log(imageLoader);
          setImage((stateCopy) => {
            return [...stateCopy, { loader: imageLoader }];
          });
        });
      };
  return (
    <div className='my-[10%]' >
      <h1 className="text-[40px] font-AbrilRegular text-[#244262]">
          Add Products
        </h1>
        <div className='w-[50%] mx-auto' >
        <input
          className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
          type="text"
          placeholder="Product Name"
        />
        <br />
        <input
          className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
          type="nunber"
          placeholder="MRP"
        />
        <br />
        <input
          className="bg-[#EBF5FF] w-full py-[4%] px-[4%] mb-[2%] "
          type="nunber"
          placeholder="Discount Price"
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
          <select className='p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular' name="" id="">
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        

    </div>
  );
};

export default AddProducts;