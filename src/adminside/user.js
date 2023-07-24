import React, { useState ,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../component/header";
import axios from "../axios";
function User() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
      axios.get("/admin/users/",{headers : {Authorization : localStorage.getItem("jwt")}}).then((res)=>{
        setData(res.data.users);
      })
  }, [])
  let i =1;
  
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
          <table className="table" style={{ textAlign: "center" }}>
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th scope="col">SR.No</th>
                <th scope="col">Username</th>
                <th scope="col">email</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            {data.length != 0 ? (
              data.map((item, index) => (
                <>
                  <tr style={{ marginBottom: "1rem" }}>
                    <td>{i++}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ width: "4rem", height: "40px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/users/details", { state: { id: item._id } });
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </>
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

export default User;
