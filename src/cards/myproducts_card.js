import React from 'react'
import { useNavigate } from 'react-router-dom'
function Product_Card(props) {
  const navigate = useNavigate();
  const del = (e) => {
    props.onDelete(props._id);
    e.preventDefault();
  };
  return (
    <>
      <div className="col">
        <div className="card shadow-sm">
          <img
            src={`http://localhost:9000/products/${props.image}`}
            className="img"
            style={{ width: "100%" }}
            alt="..."
            onClick={() => {
              navigate("/products/details/myproduct", { state: { id: props._id } });
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
              <div className="d-flex justify-content-between align-items-center mt-1">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-success" onClick={()=>{navigate("/products/update",{state:{id : props._id}})}}>Update</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={del}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Product_Card
