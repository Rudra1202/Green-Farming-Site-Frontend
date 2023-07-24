import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios.js";
function Login() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    username: "",
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
  const login_user = () => {
    axios.post("/login", data).then((res) => {
      localStorage.setItem("jwt",res.data.token);
      if (res.data.message === "success") {
        alert(res.data.message);
        navigate("/products/");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <>
      <div className=" login_box">
        <h1>Login</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <div className="form-group mt-2">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="username"
                    required
                    value={data.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control mt-2"
                    name="password"
                    required
                    value={data.password}
                    onChange={handleChange}
                  />
                </div>{" "}
                <span style={{ display: "flex", alignItems: "end" }}>
                  <button
                    type="submit"
                    onClick={login_user}
                    className="btn btn-dark mt-3"
                  >
                    Login
                  </button>
                  <a
                    onClick={() => navigate("/forget")}
                    className="mb-2"
                    style={{ marginLeft: "4%", fontSize: "small" }}
                  >
                    Forget_password?
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
