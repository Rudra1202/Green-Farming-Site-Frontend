import React, { useState } from "react";
import axios from "../axios.js";
import Header from "../component/header.js";
import { useLocation, useNavigate } from "react-router-dom";
function User() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;
  const [data, setData] = useState([]);

  axios
    .get(`/user/details/${id}`, {
      headers: { Authorization: localStorage.getItem("jwt") },
    })
    .then((res) => {
      if (res.data.message === "success") {
        setData(res.data.data);
      }
    });

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div
              className="container-fluid py-5 d-flex justify-content-center align-item-center"
              style={{ flexDirection: "column" }}
            >
              <h4 className="display-9 fw-bold">User Details</h4>
              <span>User : {data.username}</span>
              <span>Email : {data.email}</span>
              <span>Role : {data.role}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
