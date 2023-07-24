import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import Card from "../cards/myorder_card";
import Header from "./header.js";
import { useNavigate } from "react-router-dom";
function Myorder() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/products/myorder/details/list", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        if (res.data.message === "Founded") {
          setData(res.data.data);
          setRole(res.data.role);
        } else if (res.data.message === "Not Founded") {
          document.querySelector(".orderNotFound").innerHTML =
            "<center><h2><strong>Start Shopping Now</strong></h2><center>";
        } else {
          alert(res.data.message);
          navigate("/login");
        }
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
              <p className="lead text-muted">MyOrders</p>
            </div>
          </div>
        </section>
        <div className="container">
          <table className="table" style={{ textAlign: "start" }}>
            <thead style={{ textAlign: "start" }}>
              <tr>
                <th scope="col">SR.No</th>
                {data.length != 0 && role === "admin" ? (
                  <>
                    <th scope="col">Username</th>
                  </>
                ) : (
                  <></>
                )}
                <th scope="col">OrderID</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            {data.length != 0 ? (
              data.map((item, index) => (
                <Card
                  username={item.username}
                  _id={item._id}
                  userId ={item.userId}
                  sr_no={i++}
                  orderID={item.orderId}
                  date={item.date}
                  amount={item.amount}
                  status={item.status}
                  role={role}
                  key={index}
                />
              ))
            ) : (
              <>
                <p className="orderNotFound">
                  <strong></strong>
                </p>
              </>
            )}
          </table>
        </div>
      </main>

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
export default Myorder;