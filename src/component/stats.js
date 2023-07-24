import React, { useEffect, useState } from "react";
import axios from "../axios";
import Header from "./header.js";
import { useNavigate } from "react-router-dom";
function Stats() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    axios
      .get("/admin/", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        if (res.data.message === "success") {
          setUser(res.data.users);
          setProducts(res.data.products);
          setPayment(res.data.payments);
        } else alert(res.data.message);
      });
  }, []);
  let i = 1;
  return (
    <>
      <Header />
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Organic Products</h1>
              <p className="lead text-muted">Eat Healthy Be Strong !!</p>
            </div>
          </div>
        </section>
        <div class="row d-flex gap-5 mt-5 justify-content-center">
          <div
            class=" col dropdown-menu d-block position-static pt-0 mx-0 rounded-3 shadow overflow-hidden w-280px"
            style={{ cursor: "pointer" }}
            onClick={()=>{navigate("/admin/user")}}
          >
            <div className="container d-flex justify-content-center align-item-center mt-5">
              <h4>Users : {user.length}</h4>
            </div>
          </div>
          <div
            class=" col dropdown-menu d-block position-static pt-0 mx-0 rounded-3 shadow overflow-hidden w-280px"
            style={{ cursor: "pointer" }}
            onClick={()=>{navigate("/admin/product")}}
          >
            <div className="container d-flex justify-content-center align-item-center mt-5 mb-5">
              <h4>Total Products : {products.length}</h4>
            </div>
          </div>
          <div
            class=" col dropdown-menu d-block position-static pt-0 mx-0 rounded-3 shadow overflow-hidden w-280px"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/products/myorder");
            }}
          >
            <div className="container d-flex justify-content-center align-item-center mt-5">
              <h4>Successfull Payments : {payment.length}</h4>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Stats;
