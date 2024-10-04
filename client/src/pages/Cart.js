import React, { useEffect, useState } from "react";
import CartHeader from "../components/CartHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [radio, setRadio] = useState();
  const [address, setAddress] = useState();
  const [a, setA] = useState("");
  const [data, setData] = useState([]);
const nav=useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user ? user._id : null;
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://mindhill-7.onrender.com/api/v1/product/get-cart/${userId}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  let total = 0;
  data.map((item) => {
    const add = item.offerPrice * item.quantity;
    total += add;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const updateQuantity = async (quantity, sign, cartId) => {
    try {
      if (sign === "+") {
        quantity += 1;
      } else {
        quantity -= 1;
      }
      await axios.put(`https://mindhill-7.onrender.com/api/v1/product/update-cart/${cartId}`, { quantity });

      fetchData();
    } catch (error) {}
  };

  const deleteCart = async (cartId) => {
    try {
      await axios.delete(`https://mindhill-7.onrender.com/api/v1/product/delete-cart/${cartId}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  // 5559 4265 3785 2759
  let paymentId = "";
  const checkOut = async () => {
    try {
      console.log(paymentId);

      if (radio === "COD") {
        confirmOrder();
      } else if (radio === "ONLINE") {
        if (!address) {
          window.alert("Fill address");
        } else {
          const { data: order } = await axios.post(
            "api/v1/payment/create-payment",
            {
              amount: (total + 50) * 100, // e.g., 50000 paise = ₹500
            }
          );
          const options = {
            key: "rzp_test_VYT3qiUFj68Unw",
            amount: order.amount,
            currency: order.currency,
            name: "Mind Hill",
            description: "Test Transaction",
            order_id: order.id,
            handler: function (response) {
              paymentId = response;
              setTimeout(() => {
                confirmOrder();
              }, 1000);
            },
            prefill: {
              name: user.name,
              email: user.email,
              contact: user.phone,
            },
            notes: {
              address: "Customer Address",
            },
            theme: {
              color: "#94C4F7",
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        }
      } else {
        window.alert("Select any payment");
      }
    } catch (error) {
      console.log(error);

      window.alert(error.response.data.message);
    }
  };

  const confirmOrder = async () => {
    try {
      console.log(paymentId);

      if (paymentId || radio === "COD") {
        const res = await axios.post("https://mindhill-7.onrender.com/api/v1/product/create-order", {
          userId,
          address,
          bill: total + 50,
          cartId,
        });
        console.log(res.data);

        if (res.data.success) {
         
          nav('/success_order')
          
        }

        const response = await axios.post(
          "https://mindhill-7.onrender.com/api/v1/product/create-ordered-users",
          { userId }
        );
        console.log(response);
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    confirmOrder();
  }, []);

  let cartId = [];

  setTimeout(() => {
    setA("Sorry, your cart is empty");
  }, 500);
  return (
    <div>
      <CartHeader />
      {data.length > 0 ? (
        <div>
          <div className="px-[10%] py-[5%]">
            <div>
              <div className="flex justify-between text-left py-[1%] text-[20px] max-[550px]:text-[15px] font-AbrilRegular text-[#244262] items-center ">
                <div className="w-[5%]"></div>
                <div className="w-[10%] max-[550px]:hidden"></div>
                <div className="w-[25%]">
                  <h1>Product</h1>
                </div>
                <div className="w-[20%] max-[550px]:hidden">
                  <h1>Price</h1>
                </div>
                <div className="w-[20%]">
                  <h1>Quantity</h1>
                </div>
                <div className="w-[20%]">
                  <h1>Subtotal</h1>
                </div>
              </div>

              {data.map((items) => {
                const price = items.offerPrice * items.quantity;
                cartId.push(items);
                console.log(cartId);

                return (
                  <div
                    key={items._id}
                    className="flex justify-between text-left py-[1%] text-[16px] max-[550px]:text-[13px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]"
                  >
                    <div className="w-[5%]">
                      <div
                        onClick={() => deleteCart(items._id)}
                        className=" cursor-pointer h-[100px] max-[550px]:h-[55px] flex justify-center items-center"
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="h-[28%] text-[#244262] "
                        />
                      </div>
                    </div>
                    <div className="w-[10%] p-[1%] max-[550px]:hidden">
                      <img className="max-[550px]:hidden" src={items.img1} alt="" />
                    </div>
                    <div className="w-[25%]">
                      <h1>{items.name}</h1>
                    </div>
                    <div className="w-[20%] max-[550px]:hidden">
                      <h1>₹{items.offerPrice}</h1>
                    </div>
                    <div className="w-[20%]">
                      <div className="flex items-center h-[54px] max-[550px]:h-[43px] max-[400px]:h-[39px] ">
                        <div className="py-[15px] px-[25px] max-[550px]:py-[12px] max-[550px]:px-[20px] max-[400px]:py-[10px] max-[400px]:px-[15px] bg-[#EBF5FF] font-gorditaRegular">
                          <h3>{items.quantity}</h3>
                        </div>
                        <div className="grid grid-rows-2 gap-y-[3%] h-full">
                          <div
                            onClick={() =>
                              updateQuantity(items.quantity, "+", items._id)
                            }
                            className="bg-[#94C4F7] w-[27px] max-[550px]:w-[20px] max-[400px]:w-[16px]  flex justify-center items-center"
                          >
                            <FontAwesomeIcon
                              icon={faAngleUp}
                              className="h-[13px] text-white "
                            />
                          </div>
                          <div
                            onClick={() =>
                              updateQuantity(items.quantity, "-", items._id)
                            }
                            className="bg-[#94C4F7] w-[27px] max-[550px]:w-[20px] max-[400px]:w-[16px]  flex justify-center items-center"
                          >
                            <FontAwesomeIcon
                              icon={faAngleDown}
                              className="h-[13px] text-white "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[20%]">
                      <h1>₹{price}</h1>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between my-[5%]">
              <div className="flex justify-between w-[35%] max-[500px]:w-[20%] ">
                <input
                  className="bg-[#EBF5FF]  p-[2%] max-[450px]:w-[110px] max-[450px]:text-[12px] "
                  type="text"
                  placeholder="Coupon code"
                />
                <button className="bg-[#94C4F7] py-[4%] px-[10%] font-gorditaBold text-[12px] max-[550px]:text-[8px]  tracking-[2px]  text-white">
                  ADD COUPON
                </button>
              </div>
              <div className="w-[30%] text-end">
                <button className="bg-[#94C4F7] py-[4%] px-[10%] font-gorditaBold text-[12px] max-[550px]:text-[8px] tracking-[2px]  text-white">
                  PROCEED TO PAY
                </button>
              </div>
            </div>

            <div className="font-AbrilRegular text-[#244262]">
              <h1 className="text-[30px] max-[550px]:text-[25px] text-left ">Delivery Address</h1>
              <textarea
                className="bg-[#EBF5FF] w-full h-[300px] max-[550px]:text-[12px] font-gorditaRegular p-[2%]"
                name=""
                id=""
                placeholder="Delivery Address here"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <div>
              <h1 className="font-AbrilRegular text-[30px] max-[600px]:text-[25px] text-left text-[#244262] my-[3%]">
                Cart Totals
              </h1>
              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] text-[18px] max-[600px]:text-[15px] max-[400px]:text-[12px]">
                <h4 className="w-[30%] max-[550px]:w-[50%] font-AbrilRegular text-[#244262]  ">
                  Subtotal
                </h4>
                <h5 className="w-[70%] font-gorditaRegular ">
                  ₹{total}
                </h5>
              </div>
              <div className="flex text-left items-center border-b-[1px] border-b-gray-200 py-[2%] text-[18px] max-[600px]:text-[15px] max-[400px]:text-[12px] ">
                <h4 className="w-[30%] max-[550px]:w-[50%] font-AbrilRegular text-[#244262] ">
                  Payment Method
                </h4>
                <div className="w-[70%] font-gorditaRegular ">
                  <input
                    onChange={(e) => setRadio(e.target.value)}
                    type="radio"
                    checked={"COD" === radio}
                    value="COD"
                  />{" "}
                  <label>Cash On Delivery</label> <br />
                  <input
                    onChange={(e) => setRadio(e.target.value)}
                    type="radio"
                    checked={"ONLINE" === radio}
                    value="ONLINE"
                  />{" "}
                  <label>Online Payment</label>
                </div>
              </div>
              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] text-[18px] max-[600px]:text-[15px] max-[400px]:text-[12px] ">
                <h4 className="w-[30%] max-[550px]:w-[50%] font-AbrilRegular text-[#244262] ">
                  Delivery charge
                </h4>
                <h5 className="w-[70%] font-gorditaRegular ">₹50</h5>
              </div>
              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] text-[18px] max-[600px]:text-[15px] max-[400px]:text-[12px] ">
                <h4 className="w-[30%] max-[550px]:w-[50%] font-AbrilRegular text-[#244262] ">
                  Total
                </h4>
                <h5 className="w-[70%] font-gorditaRegular ">
                  ₹{total + 50}
                </h5>
              </div>
              <button
                onClick={checkOut}
                className="bg-[#94C4F7] py-[2%] px-[3%] max-[550px]:py-[5%] max-[550px]:px-[7%] my-[2%] font-gorditaBold text-[12px] tracking-[2px]  text-white"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-AbrilRegular text-[23px] text-[#244262] mt-[4%]"  >{a}</div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
