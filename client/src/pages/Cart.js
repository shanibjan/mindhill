import React, { useEffect, useState } from "react";
import CartHeader from "../components/CartHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";

const Cart = () => {
  const [radio, setRadio] = useState();
  const [address, setAddress] = useState();
  const [a, setA] = useState("");
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user ? user._id : null;
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/product/get-cart/${userId}`
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
      await axios.put(`api/v1/product/update-cart/${cartId}`, { quantity });

      fetchData();
    } catch (error) {}
  };

  const deleteCart = async (cartId) => {
    try {
      await axios.delete(`api/v1/product/delete-cart/${cartId}`);
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
        const res = await axios.post("api/v1/product/create-order", {
          userId,
          address,
          bill: total + 50,
          cartId,
        });
        console.log(res.data);

        if (res.data.success) {
          window.alert(res.data.message);
        }

        const response = await axios.post(
          "api/v1/product/create-ordered-users",
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
              <div className="flex justify-between text-left py-[1%] text-[20px] font-AbrilRegular text-[#244262] items-center ">
                <div className="w-[5%]"></div>
                <div className="w-[10%]"></div>
                <div className="w-[25%]">
                  <h1>Product</h1>
                </div>
                <div className="w-[20%]">
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
                    className="flex justify-between text-left py-[1%] text-[16px] font-gorditaRegular text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]"
                  >
                    <div className="w-[5%]">
                      <div
                        onClick={() => deleteCart(items._id)}
                        className=" cursor-pointer h-[100px] flex justify-center items-center"
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="h-[28%] text-[#244262] "
                        />
                      </div>
                    </div>
                    <div className="w-[10%] p-[1%]">
                      <img src={items.img1} alt="" />
                    </div>
                    <div className="w-[25%]">
                      <h1>{items.name}</h1>
                    </div>
                    <div className="w-[20%]">
                      <h1>₹{items.offerPrice}</h1>
                    </div>
                    <div className="w-[20%]">
                      <div className="flex items-center h-[54px] ">
                        <div className="py-[15px] px-[25px] bg-[#EBF5FF] font-gorditaRegular">
                          <h3>{items.quantity}</h3>
                        </div>
                        <div className="grid grid-rows-2 gap-y-[3%] h-full">
                          <div
                            onClick={() =>
                              updateQuantity(items.quantity, "+", items._id)
                            }
                            className="bg-[#94C4F7] w-[27px]  flex justify-center items-center"
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
                            className="bg-[#94C4F7] w-[27px]  flex justify-center items-center"
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
              <div className="flex justify-between w-[35%] ">
                <input
                  className="bg-[#EBF5FF]  p-[2%]"
                  type="text"
                  placeholder="Coupon code"
                />
                <button className="bg-[#94C4F7] py-[4%] px-[10%] font-gorditaBold text-[12px] tracking-[2px]  text-white">
                  ADD COUPON
                </button>
              </div>
              <div className="w-[30%] text-end">
                <button className="bg-[#94C4F7] py-[4%] px-[10%] font-gorditaBold text-[12px] tracking-[2px]  text-white">
                  PROCEED TO PAY
                </button>
              </div>
            </div>

            <div className="font-AbrilRegular text-[#244262]">
              <h1 className="text-[30px] text-left ">Delivery Address</h1>
              <textarea
                className="bg-[#EBF5FF] w-full h-[300px] font-gorditaRegular p-[2%]"
                name=""
                id=""
                placeholder="Delivery Address here"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <div>
              <h1 className="font-AbrilRegular text-[30px] text-left text-[#244262] my-[3%]">
                Cart Totals
              </h1>
              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%]">
                <h4 className="w-[30%] font-AbrilRegular text-[#244262] text-[18px]">
                  Subtotal
                </h4>
                <h5 className="w-[70%] font-gorditaRegular text-[18px]">
                  ₹{total}
                </h5>
              </div>
              <div className="flex text-left items-center border-b-[1px] border-b-gray-200 py-[2%] ">
                <h4 className="w-[30%] font-AbrilRegular text-[#244262] text-[18px]">
                  Payment Method
                </h4>
                <div className="w-[70%] font-gorditaRegular text-[18px]">
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
              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] ">
                <h4 className="w-[30%] font-AbrilRegular text-[#244262] text-[18px]">
                  Delivery charge
                </h4>
                <h5 className="w-[70%] font-gorditaRegular text-[18px]">₹50</h5>
              </div>
              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] ">
                <h4 className="w-[30%] font-AbrilRegular text-[#244262] text-[18px]">
                  Total
                </h4>
                <h5 className="w-[70%] font-gorditaRegular text-[18px]">
                  ₹{total + 50}
                </h5>
              </div>
              <button
                onClick={checkOut}
                className="bg-[#94C4F7] py-[2%] px-[3%] my-[2%] font-gorditaBold text-[12px] tracking-[2px]  text-white"
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
