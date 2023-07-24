import React, { useEffect, useState } from "react";
import Card from "./myorder_card";
import Header from "../component/header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios.js";

function Myorder_Intermediate() {
  const location = useLocation();
  let total = 0;
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(null);
  useEffect(() => {
    const id = location.state.id;
    axios
      .get(`/products/myorder/details/list/${id}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        if (res.data.message === "successPayment") {
          setPayment(res.data.Payment);
          setData(res.data.data);
          setCart(res.data.data.cart);
        } else if (res.data.message === "successDetails") {
          setData(res.data.data);
          setCart(res.data.data.cart);
        } else navigate("/products/myorder");
      });
  }, []);
  return (
    <>
      <Header />
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Organic Products</h1>
              <p className="lead text-muted">Eat Healthy Be Strong !!</p>
              <p className="lead text-muted">MyOrders</p>
            </div>
          </div>
        </section>

        <div className="container" id="hanging-icons">
          <h4 className="pb-2 border-bottom">Date of Order : {data.date} </h4>
          <div class="p-5 mb-4 bg-light rounded-3">
            <div class="container-fluid py-5" style={{ marginLeft: "8%" }}>
              <h4 class="display-9 fw-bold mb-5">Cart Details</h4>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {data.length != 0 && cart != null ? (
                  cart.map(
                    (item, index) => (
                      (total += item.count * item.price),
                      (
                        <>
                          <div
                            className="col d-flex"
                            style={{
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={`http://localhost:9000/products/${item.image}`}
                              className="img"
                              style={{ width: "50%", cursor: "pointer" }}
                              alt="..."
                              onClick={(e) => {
                                e.preventDefault();
                                const id = item.productId;
                                navigate("/products/details/", {
                                  state: { id: id },
                                });
                              }}
                            />
                          </div>
                          <div
                            className="col d-flex"
                            style={{
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p className="mb-1"> Product name : {item.name}</p>
                            <p className="mb-1"> Price : ${item.price}.00</p>
                            <p className="mb-1">
                              {" "}
                              Quantity Ordered : {item.count}
                            </p>
                            <p className="mb-1"> Product name : {item.name}</p>
                            <p className="mb-1">
                              {" "}
                              Total Amount on Product : $
                              {item.count * item.price}
                              .00
                            </p>
                          </div>
                        </>
                      )
                    )
                  )
                ) : (
                  <></>
                )}
              </div>
              <strong className="mt-5">
                Total Amount In Cart is : {total}
              </strong>
            </div>
          </div>
          <div class="p-5 mb-4 bg-light rounded-3">
            <div class="container-fluid py-5" style={{ marginLeft: "8%" }}>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 mb-5">
                <div
                  class="col d-flex justify-content-center align-item-center"
                  style={{ flexDirection: "column" }}
                >
                  <h4 class="display-9 fw-bold">Order Details</h4>
                  <span>OrderId : {data.orderId}</span>
                  <span>Total Amount : ${data.amount}.00</span>
                  <span>Date of Order : {data.date}</span>
                  <span>
                    Status :{" "}
                    {data.status ? (
                      <>
                        <span
                          style={{ color: "darkgreen", fontWeight: "bold" }}
                        >
                          Success
                        </span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Failed
                        </span>
                      </>
                    )}
                  </span>
                </div>
                {payment.length != 0 ? (
                  payment.map((item, index) => (
                    <>
                      <div
                        class="col"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "start",
                          flexDirection: "column",
                        }}
                      >
                        <h4 class="display-9 fw-bold">Payment Details</h4>
                        <span>Payment ID : {item.referencePaymentId}</span>
                        <span>Order ID : {item.referenceOrderId}</span>
                        <span>Total Amount : ${item.amount}.00</span>
                        <span>Date of Payment : {item.paymentDate}</span>
                        <span>
                          Status :{" "}
                          {item.status ? (
                            <>
                              <span
                                style={{
                                  color: "darkgreen",
                                  fontWeight: "bold",
                                }}
                              >
                                Success
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                Failed
                              </span>
                            </>
                          )}
                        </span>
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Myorder_Intermediate;