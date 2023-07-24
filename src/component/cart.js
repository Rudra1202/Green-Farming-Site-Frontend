import React, { useEffect, useState } from "react";
import Header from "./header";
import Card from "../cards/cart_card";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [data, setData] = useState([]);
  const [key, setKey] = useState("");
  const [userID,setUserID] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/products/carts/display", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        setData(res.data);
      });
    axios
      .get("/userID", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        setUserID(res.data);
      });
    axios
      .get("/payment/key", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        setKey(res.data);
      });
  }, []);
  var payment = 0;

  const handleDelete = (id) => {
    try {
      if (window.confirm("You surely want to remove from cart ??")) {
        axios
          .delete(`/products/carts/${id}`, {
            headers: { Authorization: localStorage.getItem("jwt") },
          })
          .then((res) => {
            alert(res.data.message);
            axios
              .get("/products/carts/display", {
                headers: { Authorization: localStorage.getItem("jwt") },
              })
              .then((res) => {
                setData(res.data);
                navigate("/products/cart");
              });
          });
      } else {
        navigate("/products/cart");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCount = (id, data) => {
    try {
      axios
        .patch(`/products/carts/count/${id}`, data, {
          headers: { Authorization: localStorage.getItem("jwt") },
        })
        .then((res) => {
          axios
            .get("/products/carts/display", {
              headers: { Authorization: localStorage.getItem("jwt") },
            })
            .then((res) => {
              setData(res.data);
              navigate("/products/cart");
            });
        });
    } catch (e) {
      console.error(e);
    }
  };

  let stockPay = {
    stock: null,
    count: null,
  };

  const checkPay = async (stock, count) => (
    (stockPay.stock = stock), (stockPay.count = count)
  );

  return (
    <>
      <Header />
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            {data.length != 0 ? (
              data.map(
                (item, index) => (
                  (payment += item.price * item.count),
                  (
                    <Card
                      key={index}
                      _id={item._id}
                      productId={item.productId}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      stock={item.stock}
                      count={item.count}
                      onDelete={handleDelete}
                      onChange={handleCount}
                      checkPay={checkPay}
                    />
                  )
                )
              )
            ) : (
              <h1>EMPTY CART</h1>
            )}
          </div>
          <div className="col">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-success">Your cart</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Total Item Price</h6>
                  <small className="text-muted"></small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Payment Request (USD)</span>
                {data.length != 0 ? (
                  <>
                    <strong>${payment}</strong>
                  </>
                ) : (
                  <>
                    <strong>$0</strong>
                  </>
                )}
              </li>
            </ul>
            <div className="card p-2">
              <div className="input-group">
                {data.length != 0 && stockPay.count <= stockPay.stock ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={async (e) => {
                        e.preventDefault();
                        const amount = payment;
                        let responce = await fetch(
                          "http://localhost:9000/payment",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              // Authorization: localStorage.getItem("jwt"),
                            },
                            body: JSON.stringify({
                              amount: amount,
                              userID
                            }),
                          }
                        );
                        var razorpay_payment_id = {
                          payId: "",
                        };
                        var orderData = {
                          id: "",
                          amount: null,
                          created_at: null,
                        };

                        let orderDatapay = await responce.json();
                        orderData.id = orderDatapay.order.id;
                        orderData.amount = orderDatapay.order.amount;
                        orderData.created_at = orderDatapay.order.created_at;

                        var options = {
                          key: key,
                          amount: amount * 100,
                          currency: "INR",
                          name: "Green Farming",
                          description: "Test Transaction",
                          order_id: orderDatapay.id,
                          callback_url: "http://localhost:9000/payment/verify",
                          theme: {
                            color: "#3399cc",
                          },
                          handler: function (responce) {
                            razorpay_payment_id.payId =
                              responce.razorpay_payment_id;
                            var orderId = {
                              _id: orderDatapay.data._id,
                            };
                            axios
                              .post("/payment/ordered", orderId, {
                                headers: {
                                  Authorization: localStorage.getItem("jwt"),
                                },
                              })
                              .then((res) => {
                                if (res.data.message === "success") {
                                  axios
                                    .post(
                                      "/payment/details",
                                      {
                                        razorpay_payment_id,
                                        orderId,
                                        orderData,
                                      },
                                      {
                                        headers: {
                                          Authorization:
                                            localStorage.getItem("jwt"),
                                        },
                                      }
                                    )
                                    .then((res) => {
                                      if (res.data.message === "success") {
                                        navigate("/products/myorder");
                                      }
                                    });
                                }
                              });
                          },
                        };
                        var rzp1 = new window.Razorpay(options);
                        rzp1.open();
                      }}>
                      PAYMENT
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-outline-primary">PAYMENT</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-muted py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#" style={{ textDecoration: "none", color: "Red" }}>
              Go Back to Top
            </a>
          </p>
          <p className="float-start mb-1">
            <p className="mb-1">© Green Farming</p>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Cart;
