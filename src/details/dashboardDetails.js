import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../axios";
import Header from "../component/header";
import { useNavigate } from "react-router-dom";

function DashboardDetails() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  useEffect(() => {
    axios
      .get(`/products/details/${id}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <>
      <Header />
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="card">
                    <div className="badge  card-badge text-uppercase">
                      <div className="image">
                        {data.length != 0 ? (
                          <img
                            src={`http://localhost:9000/products/${data.images[0].image1}`}
                            className="card-img-top"
                          />
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flickity-nav mx-n2 mb-10 mb-md-0 d-flex mt-3"
                    style={{ display: "flex", justifyContent: "space-around" }}
                    data-flickity='{"asNavFor": "#productSlider", "contain": true, "wrapAround": false}'
                  >
                    <div className="image1">
                      {data.length != 0 ? (
                        <>
                          <img
                            src={`http://localhost:9000/products/${data.images[0].image1}`}
                            className="card-img-top"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div className="image2">
                      {data.length != 0 ? (
                        <>
                          <img
                            src={`http://localhost:9000/products/${data.images[0].image2}`}
                            className="card-img-top"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div className="image3">
                      {data.length != 0 ? (
                        <>
                          <img
                            src={`http://localhost:9000/products/${data.images[0].image3}`}
                            className="card-img-top"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 ps-lg-10">
                  <div className="row mb-1">
                    <div className="col">Organic Framing</div>
                    <div className="col-auto">
                      {/* <a className="fs-sm text-reset ms-2" href="#reviews">
                        Reviews (6)
                      </a> */}
                    </div>
                  </div>
                  <h3 className="mb-2">{data ? data.name : <p></p>}</h3>
                  <div className="mb-7">
                    <span className="ms-1 fs-5 fw-bolder text-primary">
                      $
                      {data && data.stock != 0 ? (
                        data.price
                      ) : (
                        <p>Out of stock</p>
                      )}
                      .00
                    </span>
                    <span className="fs-sm ms-1">
                      (In Stock : {data ? data.stock : <p></p>})
                    </span>
                  </div>

                  <div className="form-group">
                    <p className="mb-5">
                      Description:{" "}
                      <strong id="colorCaption">
                        {data ? data.details : <p></p>}
                      </strong>
                    </p>
                  </div>
                  <div className="form-group">
                    <div className="row gx-5 mb-7">
                      <div className="col-12 col-lg-auto w-50">
                        {data.length != 0 ? (
                          <button
                            type="button"
                            className="btn w-100 btn-dark mb-2"
                            onClick={(e) => {
                              var cart = {
                                _id: id,
                                name: data.name,
                                price: data.price,
                                stock: data.stock,
                                image: data.images[0].image1,
                              };
                              if (cart.name != "") {
                                axios
                                  .post("/products/carts/add", cart, {
                                    headers: {
                                      Authorization:
                                        localStorage.getItem("jwt"),
                                    },
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
                                          axios.patch(
                                            `/products/carts/count/${count._id}`,
                                            count,
                                            {
                                              headers: {
                                                Authorization:
                                                  localStorage.getItem("jwt"),
                                              },
                                            }
                                          );
                                        } catch (e) {
                                          console.error(e);
                                        }
                                      }
                                    }
                                  });
                              }
                            }}
                          >
                            Add to Cart{" "}
                            <i className="fa-regular fa-cart-shopping"></i>
                          </button>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className="col-12 col-lg-auto w-50">
                        {data.length != 0 ? (
                          <button
                            className="btn btn-outline-success w-100 mb-2"
                            type="button"
                            onClick={() => {
                              var cart = {
                                _id: id,
                                name: data.name,
                                price: data.price,
                                stock: data.stock,
                                image: data.images[0].image1,
                              };
                              if (cart.name != "") {
                                axios
                                  .post("/products/carts/add", cart, {
                                    headers: {
                                      Authorization:
                                        localStorage.getItem("jwt"),
                                    },
                                  })
                                  .then((res) => {
                                    if (res.data.message === "OutOfStock") {
                                      alert("OutOFStock");
                                    } else if (res.data.message === "success" || res.data.message==="found") {
                                      navigate("/products/cart/");
                                    }
                                  });
                              }
                            }}
                          >
                            Buy <i className="fa-solid fa-bag-shopping"></i>
                          </button>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {data.length != 0 ? (
        (document.querySelector(".image1").addEventListener("click", (e) => {
          {
            document.querySelector(".image").innerHTML = `<img
                                src="http://localhost:9000/products/${data.images[0].image1}"
                                class="card-img-top"
                              />`;
          }
        }),
        document.querySelector(".image2").addEventListener("click", (e) => {
          {
            document.querySelector(".image").innerHTML = `<img
                                src="http://localhost:9000/products/${data.images[0].image2}"
                                class="card-img-top"
                              />`;
          }
        }),
        document.querySelector(".image3").addEventListener("click", (e) => {
          {
            document.querySelector(".image").innerHTML = `<img
                                src='http://localhost:9000/products/${data.images[0].image3}'
                                class="card-img-top"
                              />`;
          }
        }))
      ) : (
        <p></p>
      )}

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

export default DashboardDetails;
