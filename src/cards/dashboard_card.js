import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
function Card(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    _id: props._id,
    name: props.name,
    price: props.price,
    stock: props.stock,
    image: props.image,
  });
  const handleBuy = () => {
    axios
      .post("/products/carts/add", data, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        if (res.data.message === "OutOfStock") {
          alert("OutOFStock");
        } else if (res.data.message === "success" || res.data.message === "found") {
          navigate("/products/cart/");
        }
      });
  };

  const handleAddToCart = async () => {
    await axios
      .post("/products/carts/add", data, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        if (res.data.message === "OutOfStock") {
          alert("OutOFStock");
        } else if (res.data.message === "success") {
          alert("Added to the cart");
        } else if (res.data.message === "found") {
          alert("Already Founded");
          var count = {
            _id: res.data.data._id,
            count: res.data.data.count + 1,
          };
          if (count._id != "") {
            try {
              axios.patch(`/products/carts/count/${count._id}`, count, {
                headers: { Authorization: localStorage.getItem("jwt") },
              });
            } catch (e) {
              console.error(e);
            }
          }
        }
      });
  };

  return (
    <>
      <div className="col">
        <div className="card shadow-sm">
          <img
            src={`http://localhost:9000/products/${props.image}`}
            className="img"
            style={{ width: "100%", cursor: "pointer" }}
            alt="..."
            onClick={() => {
              navigate("/products/details/", { state: { id: props._id } });
            }}
          />
          <div className="card-body">
            <p className="card-text mb-1"> {props.name}</p>
            <small className="text-muted">Description : {props.details}</small>
            <div className="d-flex justify-content-between align-items-center mt-1">
              <small className="text-muted">Review : 4.5 star</small>
              <small className="text-muted">Price : {props.price}</small>
              <small className="text-muted">Stock : {props.stock}</small>
            </div>
            <div className="btn-group mt-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={handleBuy}
              >
                Buy
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-success"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
