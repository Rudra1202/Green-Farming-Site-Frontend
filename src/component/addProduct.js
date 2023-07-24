import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios.js";
import Header from "./header.js";
function AddProduct() {
  const [data, setdata] = useState({
    name: "",
    details: "",
    price: 0,
    stock: 0,
  });
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

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

  function handleimage1(event) {
    setFile1(event.target.files[0]);
  }
  function handleimage2(event) {
    setFile2(event.target.files[0]);
  }
  function handleimage3(event) {
    setFile3(event.target.files[0]);
  }
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);

    try {
      const response = await axios
        .post("/products/add", formData, {
          headers: { Authorization: localStorage.getItem("jwt") },
        })
        .then((res) => {
          if (res.data.message === "success") {
            alert(res.data.message);
            navigate("/products/");
          } else {
            alert(res.data.message);
            navigate("/login");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="title">
          <h1 className="display-5 fw-bold mt-4">Add Products</h1>
        </div>
        <div className="student__info">
          <form onSubmit={handleFormSubmit}>
            <div
              className="input-group mb-3 mt-5"
              style={{ border: " 1px solid black" }}
            >
              <span className="input-group-text">Name of Product : </span>
              <input
                style={{ borderLeft: "1px solid black" }}
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="eg. Food Brand Name"
                aria-label="Username"
                value={data.name}
                onChange={handleChange}
                autoFocus
                required
              />
            </div>
            <div
              className="input-group mb-3"
              style={{ border: " 1px solid black" }}
            >
              <span className="input-group-text">Description : </span>
              <input
                style={{ borderLeft: "1px solid black" }}
                type="text"
                className="form-control"
                name="details"
                id="details"
                value={data.details}
                onChange={handleChange}
                placeholder="eg. Explan Product details"
                aria-label="Username"
                required
              />
            </div>
            <div
              className="input-group mb-3"
              style={{ border: " 1px solid black" }}
            >
              <span className="input-group-text">Price/pc : </span>
              <input
                type="Number"
                min={0}
                style={{ borderLeft: "1px solid black" }}
                className="form-control"
                name="price"
                id="price"
                value={data.price}
                onChange={handleChange}
                required={true}
                placeholder="eg.80"
              />
            </div>

            <div
              className="input-group mb-3"
              style={{ border: " 1px solid black" }}
            >
              <span className="input-group-text">stock : </span>
              <input
                type="Number"
                style={{ borderLeft: "1px solid black" }}
                className="form-control"
                name="stock"
                id="stock"
                min={0}
                value={data.stock}
                onChange={handleChange}
                required={true}
                placeholder="eg.80%"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload Main image :
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                name="file1"
                onChange={handleimage1}
                style={{ border: " 1px solid black" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload second image :
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                name="file2"
                onChange={handleimage2}
                style={{ border: " 1px solid black" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload third image :
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                name="file3"
                onChange={handleimage3}
                style={{ border: " 1px solid black" }}
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
