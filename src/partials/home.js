import React from "react";
import "./home.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  useNavigate
} from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="jumbotron  centered">
        <div className="container mt-4">
          <i className="fas fa-key fa-6x"></i>
          <h1 className="display-3">Register Form</h1>
          <p className="lead">
            Fill every form, so non of your opportunity missed!!!
          </p>
          <hr />
          <button
            className="btn btn-dark btn-lg m-1"
            onClick={()=>navigate('/login')}
          >
            Login
          </button>
          <button
            className="btn btn-success btn-lg"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
