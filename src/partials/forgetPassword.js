import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function Forgetpassword() {
    const navigate = useNavigate()
    const [data, setdata] = useState({
      email : ""
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
    function handleFormSubmit(event) {
      event.preventDefault();
      axios.post("/forget",data).then((res)=>{
        if (res.data.message === "success") {
          alert("Mail is Sended");
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      });  
    }
    
  return (
    <>
      <div className="row jumbotron">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
                <div className="form-group mt-2 ">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control mt-2"
                    name="email"
                    required
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
                <span style={{ display: "flex", alignItems: "end" }}>
                  <button type="submit" className="btn btn-dark mt-3" onClick={handleFormSubmit}>
                    Mail me
                  </button>
                  <a onClick={()=>navigate("/login")} className="mb-2" style={{ marginLeft: "4%" }}>
                    Login
                  </a>
                </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgetpassword;
