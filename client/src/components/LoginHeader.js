import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSearch,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import productOverView from "../images/product-overview.jpg";
import { useNavigate } from "react-router-dom";
const LoginHeader = ({ prop }) => {
  const nav = useNavigate();

  return (
    <div>
      <div
        className="overflow-visible py-[3%] px-[4%] bg-cover bg fixed w-full mt-[-14%] "
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${productOverView}) center/cover`,
        }}
      >
        <div className="flex justify-between text-white items-center">
          <div onClick={() => nav("/")}>
            <h2 className="font-AbrilRegular text-[40px]">MIND HILL</h2>
          </div>
          <div className="flex justify-between w-[30%] max-lg:w-[50%] items-center font-gorditaMedium">
            <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
              <FontAwesomeIcon icon={faSearch} className="h-[23px]" />
            </div>
            <div className="bg-[#244262] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
              <FontAwesomeIcon icon={faHeart} className="h-[23px]" />
            </div>
            <div className="bg-[#94C4F7] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center">
              <FontAwesomeIcon icon={faShoppingBasket} className="h-[23px]" />
            </div>
            <div className="dropdown">
              <div className="bg-[#FFA27E] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center ">
                <FontAwesomeIcon icon={faUser} className="h-[23px]" />
              </div>
              <ul className="dropdown-menu text-[#244262] leading-[35px] ">
                <li onClick={() => nav("/login")}>
                  {prop === "Register" ? "Login" : ""}
                </li>
                <li onClick={() => nav("/signup")}>
                  {prop === "Login" ? "Register" : ""}
                </li>
                <li onClick={() => nav("/admin")}>Admin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
