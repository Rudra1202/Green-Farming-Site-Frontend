import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios.js";
function Register() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setdata((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }
  const saveForm = () => {
    axios.post("/register", data).then((res) => {
      if (res.data.message === "success") {
        alert(res.data.message);
        navigate("/login/");
      } else {
        alert(res.data.message);
      }
    });
  };
  return (
    <>
      <div className="row jumbotron">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  required
                  onChange={handleChange}
                  value={data.username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  onChange={handleChange}
                  value={data.password}
                />
              </div>
              <span
                style={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "end",
                }}
              >
                <button
                  type="submit"
                  onClick={saveForm}
                  className="btn btn-dark mt-3"
                >
                  Submit
                </button>
                <a
                  onClick={() => navigate("/login")}
                  className="mb-2"
                  style={{ marginLeft: "4%", fontSize: "small" }}
                >
                  Already_LogIn?
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
