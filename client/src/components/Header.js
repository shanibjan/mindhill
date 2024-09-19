import React from "react";
import bg1 from "../images/bg-1.jpg";
import bg2 from "../images/bg-2.jpg";
import bg3 from "../images/bg-3.jpg";
import icon1 from '../images/icon-1.webp'
import icon2 from '../images/icon-2.webp'
import icon3 from '../images/icon-3.webp'
import icon4 from '../images/icon-4.webp'
import icon5 from '../images/icon-5.webp'
import icon6 from '../images/icon-6.webp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSearch,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "animate.css/animate.min.css";
import ReactOwlCarousel from "react-owl-carousel";

const Header = () => {
  const bgMap = [
    {
      id: 1,
      h: "ORGANIC",
      heading: "Green Way",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt dolore voluptates autem, optio quo tenetur asperiores debitis quibusdam ea. Beatae impedit, ipsa quaerat distinctio eius quis et unde. Blanditiis,",
      src: bg1,
    },
    {
      id: 2,
      h: "ORGANIC",
      heading: "Live Healthy",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt dolore voluptates autem, optio quo tenetur asperiores debitis quibusdam ea. Beatae impedit, ipsa quaerat distinctio eius quis et unde. Blanditiis,",
      src: bg2,
    },
    {
      id: 3,
      h: "ORGANIC",
      heading: "Live Organic",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt dolore voluptates autem, optio quo tenetur asperiores debitis quibusdam ea. Beatae impedit, ipsa quaerat distinctio eius quis et unde. Blanditiis,",
      src: bg3,
    },
  ];
  const icons = [
    { src: icon1, tag: "Delivery", subTag: "Prion Gravida" },
    { src: icon2, tag: "Online Shop", subTag: "Prion Gravida" },
    { src: icon3, tag: "Great Value", subTag: "Prion Gravida" },
    { src: icon4, tag: "Discount", subTag: "Prion Gravida" },
    { src: icon5, tag: "Easy Pay", subTag: "Prion Gravida" },
    { src: icon6, tag: "Security", subTag: "Prion Gravida" },
  ];

  const product = {
    items: 1,
    loop: true,
    nav: false,
    dots: false,
    margin: 30,
    animateOut: "animate__animated animate__fadeOut",
    autoplay: false,
    autoplayTimeout: 4000,
  };

  return (
    <div>
      <ReactOwlCarousel className="owl-theme" {...product}>
        {bgMap.map((bg) => (
          <div
            key={bg.id}
            className="overflow-hidden py-[3%] px-[4%] bg-cover bg"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bg.src}) center/cover`,
            }}
          >
            <div className="flex justify-between text-white items-center">
              <div>
                <h2 className="font-AbrilRegular text-[40px]">MIND HILL</h2>
              </div>
              <div className="flex justify-between w-[50%] items-center font-gorditaMedium">
                <h4>HOME</h4>
                <h4>PAGES</h4>
                <h4>SHOP</h4>
                <h4>PORTFOLIO</h4>
                <h4>BLOG</h4>
                <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faShoppingBasket}
                    className="h-[23px]"
                  />
                </div>
                <div>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
              </div>
            </div>
            <div className="text-white h-[513px] flex items-center">
              <div className="slideInFromTop">
                <h4 className="text-[25px] tracking-[25px] font-gorditaRegular">
                  {bg.h}
                </h4>
                <h1 className="  text-[100px] font-AbrilRegular">
                  {bg.heading}
                </h1>
                <p className="font-gorditaRegular my-[4%]">{bg.desc}</p>
                <button className="bg-[#94C4F7] py-[1%] px-[3%] font-gorditaMedium more">
                  VIEW MORE
                </button>
              </div>
            </div>
          </div>
        ))}
      </ReactOwlCarousel>
      <div className="grid grid-cols-6 max-md:grid-cols-3 max-sm:grid-cols-2 py-[3%] px-[4%] gap-x-[5%] shadow-lg" >
        {icons.map((icon) => {
          return (
            <div className="flex justify-between items-center " >
              <div>
               <img className="w-full" src={icon.src} alt="" />
              </div>
              <div>
                <h2 className="font-AbrilRegular" >{icon.tag}</h2>
                <h3 className="font-gorditaRegular" >{icon.subTag}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
