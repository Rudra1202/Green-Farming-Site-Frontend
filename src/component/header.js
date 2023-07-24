import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios.js";
function Header() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/user/details", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        setData(res.data.data);
      });
  }, []);
  return (
    <>
      <header>
        <div className="collapse bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">Organic Farming</h4>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Shopping</h4>
                <ul className="list-unstyled">
                  <li>
                    <a
                      onClick={() => navigate("/products/")}
                      className="text-white"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/products/myproducts")}
                      className="text-white"
                    >
                      MyProducts
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/products/myorder")}
                      className="text-white"
                    >
                      MyOrders
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/products/add")}
                      className="text-white"
                    >
                      Add Products
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/products/cart")}
                      className="text-white"
                    >
                      Cart
                    </a>
                  </li>
                  {data.length != 0 && data === "admin" ? (
                    <>
                      <li>
                        <a
                          onClick={() => navigate("/admin/stats")}
                          className="text-white"
                        >
                          Stats
                        </a>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  <li>
                    <a
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                      className="text-white"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="navbar shadow-sm"
          style={{ backgroundColor: "lightgreen" }}
        >
          <div className="container">
            <a href="#" className="navbar-brand d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLineCap="round"
                strokeLinejoin="round"
                stroke-width="2"
                aria-hidden="true"
                className="me-2"
                viewBox="0 0 24 24"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <strong>Green Farming</strong>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="false"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

