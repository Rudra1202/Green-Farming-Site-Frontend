import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import Product_Card from "../cards/myproducts_card";
import Header from "./header.js";
import { useNavigate } from "react-router-dom";
function Myproduct() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/products/myproducts", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        if (res.data.message === "success") {
          setData(res.data.data);
        } else {
          alert(res.data.message);
          navigate("/login");
        }
      });
  }, []);

  const handleDelete = (id) => {
    try {
      if (window.confirm("You surely want to delete ??")) {
        axios
          .delete(`/products/${id}`, {
            headers: { Authorization: localStorage.getItem("jwt") },
          })
          .then((res) => {
            alert(res.data.message);
            axios
              .get("/products/myproducts", {
                headers: { Authorization: localStorage.getItem("jwt") },
              })
              .then((res) => {
                if (res.data.message === "success") {
                  setData(res.data.data);
                } else {
                  alert(res.data.message);
                  navigate("/login");
                }
              });
          });
      } else {
        navigate("/products/myproducts");
      }
    } catch (e) {
      console.error(e);
    }
  };

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

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {data.map((item, index) => (
                <Product_Card
                  key={index}
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.images[0].image1}
                  details={item.details}
                  stock={item.stock}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="text-muted py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#" style={{textDecoration:"none",color:"Red"}}>Go Back to Top</a>
          </p>
          <p className="float-start mb-1">
            <p className="mb-1">© Green Farming</p>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Myproduct;
