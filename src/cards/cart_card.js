import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
function Card(props) {
  const navigate = useNavigate([]);
  const del = (e) => {
    props.onDelete(props._id);
    e.preventDefault();
  };
  const [check, setCheck] = useState(null);
  useEffect(() => {
    const pId = props.productId;
    axios
      .get(`/products/${pId}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        if (res.data.stock === 0) {
          const id = props._id;
          alert("Some Products are Out Of Stock");
          axios.delete(`/products/carts/${id}`, {
            headers: { Authorization: localStorage.getItem("jwt") },
          });
          navigate("/products/");
        }
        var count = {
          count: props.count,
        };
        if (res.data.stock < props.count) {
          count.count = res.data.stock;
          props.onChange(props._id,count);
        }
        props.checkPay(res.data.stock,props.count);
        setCheck(res.data);
      });
  }, []);

  return (
    <>
      {check ? (
        <>
          <div className="col">
            <div className="card shadow-sm">
              <img
                src={`http://localhost:9000/products/${props.image}`}
                className="img"
                style={{ width: "100px", height: "100px" }}
                alt="..."
              />
              <div className="card-body">
                <p className="card-text mb-1">Name : {props.name}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Review : 4.5 star</small>
                  <small className="text-muted">Price : {props.price}</small>
                  <small className="text-muted">Stock : {check.stock}</small>
                  <div className="btn-group d-flex align-item-center justify-contain-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      style={{ marginRight: "10px" }}
                      onClick={(e) => {
                        var count = {
                          count: props.count,
                        };
                        if (count.count > 1 && count.count <= check.stock) {
                          count.count -= 1;
                          document.querySelector(
                            ".count"
                          ).innerHTML = `<b>${count.count}</b>`;
                          props.onChange(props._id, count);
                          e.preventDefault();
                        }
                      }}
                    >
                      -
                    </button>
                    <p className="count">
                      <b>
                        {props.count}
                      </b>
                    </p>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      style={{ marginLeft: "10px" }}
                      onClick={(e) => {
                        var count = {
                          count: props.count,
                        };
                        if (count.count < check.stock) {
                          count.count += 1;
                          document.querySelector(
                            ".count"
                          ).innerHTML = `<b>${count.count}</b>`;
                          props.onChange(props._id, count);
                          e.preventDefault();
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={del}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Card;
