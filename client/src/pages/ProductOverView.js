import React, {  useEffect, useState } from "react";
import ProductHeader from "../components/ProductHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import loading from '../images/buffering-colors.gif'
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const ProductOverView = () => {
  const { productId } = useParams();
  const [a, setA] = useState("");
  const [isLoading,setIsLoading]=useState(true)
  const [image, setImage] = useState();
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const [data, setData] = useState([]);
  const [favList, setFavList] = useState([]);
  const [productData, setProductData] = useState([]);
  
  
  const [bg, setBg] = useState("Description");
  const stars = ["✩", "✩", "✩", "✩", "✩"];
  const { pathname } = useLocation();
 

  useEffect(() => {
    // Fetch product data from the API
    fetch(`https://mindhill-7.onrender.com/api/v1/product/overview/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        if(data){
          setProductData(data)
          setIsLoading(false)
        }else{
          setProductData([])
          setIsLoading(false)
        }
       
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  useEffect(() => {
    window.scrollTo(0, window.innerHeight / 2);
  }, [pathname]);

  const fetchFavoriteList = async () => {
    try {
      const res = await axios.get(`https://mindhill-7.onrender.com/api/v1/product/favoritelist/${userId}`);
      setFavList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartData = async () => {
    try {
      const res = await axios.get(
        `https://mindhill-7.onrender.com/api/v1/product/get-cart/${userId}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://mindhill-7.onrender.com/api/v1/product/get-review/${productId}`);

      setReview(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCartData();
    fetchFavoriteList();
  }, []);

  const addtoCart = async (product) => {
    try {
      const item = data.filter((items) => {
        return items.product === product._id
      });

      if (item.length > 0) {
        const updatedQty = qty + item[0].quantity;

        const res = await axios.put(
          `https://mindhill-7.onrender.com/api/v1/product/update-cart/${item[0]._id}`,
          { quantity: updatedQty }
        );
        window.alert(res.data.message);
      } else {
        const res = await axios.post("https://mindhill-7.onrender.com/api/v1/product/add-cart", {
          name: product.name,
          quantity: qty,
          offerPrice: product.offerPrice,
          img1: product.img1,
          userId,
          productId: product._id,
        });
        console.log(res.data);
        window.alert(res.data.message);
      }
      fetchCartData();
    } catch (error) {
      console.log(error);
    }
  };

  const addtoFav = async (productId) => {
    try {
      const res = await axios.post("https://mindhill-7.onrender.com/api/v1/product/add-fav", {
        userId,
        productId,
      });
      console.log(res.data);
      if (res.data.success) {
        fetchFavoriteList();
      }
    } catch (error) {
      console.log(error);

      window.alert(error.response.data.message);
    }
  };

  const removeFav = async (productId) => {
    try {
      const res = await axios.post("https://mindhill-7.onrender.com/api/v1/product/remove-fav", {
        userId,
        productId,
      });
      console.log(res.data);
      if (res.data.success) {
        fetchFavoriteList();
      }
    } catch (error) {
      window.alert(error.response.data.error);
    }
  };

  const logos = [
    { logo: faFacebook },
    { logo: faInstagram },
    { logo: faLinkedin },
    { logo: faPinterest },
    { logo: faTwitter },
  ];

  setTimeout(() => {
    setA("Sorry, No products matching");
  }, 500);
  return (
    <div>
      <ProductHeader />
      {isLoading? <div className="h-[400px] max-[450px]:h-[300px] flex justify-center items-center">
        <img src={loading} alt="" className="mx-auto h-[100px] max-[550px]:h-[50px] max-[400px]:h-[25px]" />
      </div>:null}
      {productData.length>0 ? productData.map((postDetails)=>{
        return(
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-16 py-[5%] px-[10%]">
        <div className="grid grid-row-2">
          <div className="h-full">
            <img
              className="h-full object-cover"
              src={image ? image : postDetails.img1}
              alt=""
            />
          </div>
          <div className="flex items-end">
            <div className="grid grid-cols-3 gap-[3%] mt-[3%]">
              <img
                onMouseEnter={() => setImage(postDetails.img2)}
                src={postDetails.img2}
                alt=""
              />
              <img
                onMouseEnter={() => setImage(postDetails.img3)}
                src={postDetails.img3}
                alt=""
              />
              <img
                onMouseEnter={() => setImage(postDetails.img4)}
                src={postDetails.img4}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="text-left flex items-center ">
          <div>
            <h1 className="text-[40px] font-AbrilRegular text-[#244262] max-[450px]:text-[30px] ">
              {postDetails.name}
            </h1>
            <div className="flex font-gorditaRegular my-[3%] text-[#244262] items-center max-[400px]:block  ">
              <div className="mr-[5%] grid grid-cols-5 gap-x-2  text-[23px] ">
                {stars.map((star, index) => {
                  return <h4>{index < postDetails.rating ? "★" : star}</h4>;
                })}
              </div>
              <h4>({review.length} Customer review)</h4>
            </div>
            <div className="flex justify-start font-AbrilRegular text-[30px] max-[450px]:text-[25px] ">
              <h4 className=" text-[#FFA27E] "> ₹{postDetails.offerPrice}</h4>
              <h4 className="line-through ml-[17%] text-[#244262] ">
                ₹{postDetails.price}
              </h4>
            </div>
            <p className="font-gorditaRegular text-[15px] text-gray-500 my-[5%] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At iure
              voluptatibus quo nam cum sint labore commodi eos, nostrum
              explicabo? Temporibus perspiciatis doloribus cupiditate nobis
              necessitatibus magni eius, sit nulla.
            </p>
            <div className="flex">
              <div className="flex items-center mr-[1%] ">
                <div className="py-[15px] px-[25px] bg-[#EBF5FF] font-gorditaRegular">
                  <h3>{qty}</h3>
                </div>
                <div className="grid grid-rows-2 gap-y-[3%] h-full">
                  <div
                    onClick={() => setQty(qty + 1)}
                    className="bg-[#94C4F7] w-[27px]  flex justify-center items-center"
                  >
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      className="h-[13px] text-white "
                    />
                  </div>

                  <div
                    onClick={() => (qty > 1 ? setQty(qty - 1) : null)}
                    className="bg-[#94C4F7] w-[27px]  flex justify-center items-center"
                  >
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="h-[13px] text-white "
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={()=>addtoCart(postDetails)}
                className="bg-[#94C4F7] py-[1%] px-[3%] font-gorditaMedium text-white"
              >
                ADD TO CART
              </button>
            </div>
            <div className="flex items-center my-[5%] ">
              <div className="bg-[#FFA27E] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center cursor-pointer mr-[4%] text-white">
                {favList.includes(postDetails._id) ? (
                  <FontAwesomeIcon
                    onClick={() => removeFav(postDetails._id)}
                    icon={faHeartSolid}
                    className="h-[18px] "
                  />
                ) : (
                  <FontAwesomeIcon
                    onClick={() => addtoFav(postDetails._id)}
                    icon={faHeart}
                    className="h-[18px] "
                  />
                )}
              </div>
              <h4 className="font-gorditaRegular">
                {favList.includes(postDetails._id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </h4>
            </div>
            <div className="leading-[50px] text-[#244262] ">
              <div className="flex items-baseline">
                <h3 className="font-AbrilRegular text-[20px]  mr-[5%]">SKU:</h3>
                <p className="font-gorditaRegular">05-22</p>
              </div>
              <div className="flex items-baseline">
                <h3 className="font-AbrilRegular text-[20px]  mr-[5%]">
                  Category:
                </h3>
                <p className="font-gorditaRegular">{postDetails.category}</p>
              </div>
              <div className="flex items-baseline">
                <h3 className="font-AbrilRegular text-[20px] mr-[5%]">Tags:</h3>
                <p className="font-gorditaRegular">Food,Healthy</p>
              </div>
              <div className="flex items-center">
                <h3 className="font-AbrilRegular text-[20px]  mr-[5%]">
                  Share:
                </h3>
                <div className="flex justify-between w-[50%] max-[550px]:w-[80%] text-white ">
                  {logos.map((logo) => {
                    return (
                      <div className="bg-[#94C4F7] rounded-[50%] w-[40px]  h-[40px] max-[350px]:w-[30px] max-[350px]:h-[30px] flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={logo.logo}
                          className="h-[18px] "
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        )
      }): isLoading===false? (
        <div className="font-AbrilRegular text-[23px] text-[#244262] mt-[4%] h-[400px] max-[450px]:h-[300px] flex justify-center items-center max-[550px]:text-[15px] max-[400px]:text-[13px] "  >{a}</div>
      ):null}
      
      <div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 px-[10%] gap-8 text-[22px]">
          <div
            onClick={() => setBg("Description")}
            className={`${
              bg === "Description" ? "bg-[#244262]" : "bg-[#94C4F7]"
            } p-[3%] cursor-pointer font-AbrilRegular text-left text-white`}
          >
            <h4>Description</h4>
          </div>
          <div
            onClick={() => setBg("Additional Info")}
            className={`${
              bg === "Additional Info" ? "bg-[#244262]" : "bg-[#94C4F7]"
            } p-[3%] cursor-pointer font-AbrilRegular text-left text-white`}
          >
            <h4>Additional Info</h4>
          </div>
          <div
            onClick={() => setBg("Reviews (1)")}
            className={`${
              bg === "Reviews (1)" ? "bg-[#244262]" : "bg-[#94C4F7]"
            } p-[3%] cursor-pointer font-AbrilRegular text-left text-white`}
          >
            <h4>Reviews ({review.length})</h4>
          </div>
        </div>
        {bg === "Description" ? (
          <div className="py-[3%] px-[15%] font-gorditaRegular text-gray-500">
            <p>
              Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
              Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
              Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
              ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
              tempus, tellus eget condimentum rhoncus, sem quam semper libero,
              sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
              vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et
              ante tincidunt.
            </p>
          </div>
        ) : bg === "Additional Info" ? (
          <div className="py-[3%] px-[15%] text-[20px]">
            <div className="flex py-[1%] border-b-[1px] border-b-gray-200 items-end ">
              <h2 className="w-[30%] max-[650px]:w-[40%] max-[450px]:w-[45%] text-left max-[400px]:text-[15px] font-AbrilRegular text-[#244262]">
                Weight
              </h2>
              <p className="font-gorditaRegular max-[450px]:text-[17px] max-[400px]:text-[15px] ">
                {" "}
                1 kg{" "}
              </p>
            </div>
            <div className="flex py-[1%] border-b-[1px] border-b-gray-200 items-end ">
              <h2 className="w-[30%] max-[650px]:w-[40%] max-[450px]:w-[45%] text-left max-[400px]:text-[15px] font-AbrilRegular text-[#244262]">
                Dimensions
              </h2>
              <p className="font-gorditaRegular max-[450px]:text-[17px] max-[400px]:text-[15px] ">
                10 × 10 × 30 cm
              </p>
            </div>
          </div>
        ) : (
          <Reviews productId={productId} name={productData[0].name} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductOverView;
