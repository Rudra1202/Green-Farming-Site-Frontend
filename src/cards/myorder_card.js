import React from "react";
import { useNavigate } from "react-router-dom";

function Myorder_card(props) {
  const navigate = useNavigate();
  return (
    <>
      {props.role === "admin" ? (
        <>
          <tr style={{ marginBottom: "1rem" }}>
            <td>{props.sr_no}</td>
            <td
              onClick={(e) => {
                e.preventDefault();
                navigate("/users/details", { state: { id: props.userId } });
              }}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {props.username}
            </td>
            <td>{props.orderID}</td>
            <td>{props.date}</td>
            <td>${props.amount}.00</td>
            <td>
              {props.status ? (
                <>
                  <span style={{ color: "darkgreen", fontWeight: "normal" }}>
                    Success
                  </span>
                </>
              ) : (
                <>
                  <span style={{ color: "red", fontWeight: "normal" }}>
                    Failed
                  </span>
                </>
              )}
            </td>
            <td>
              <button
                className="btn btn-outline-primary btn-sm"
                style={{ width: "4rem", height: "40px" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/products/myorder/view", {
                    state: { id: props._id },
                  });
                }}
              >
                View
              </button>
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr style={{ marginBottom: "1rem" }}>
            <td>{props.sr_no}</td>
            <td>{props.orderID}</td>
            <td>{props.date}</td>
            <td>${props.amount}.00</td>
            <td>
              {props.status ? (
                <>
                  <span style={{ color: "darkgreen", fontWeight: "normal" }}>
                    Success
                  </span>
                </>
              ) : (
                <>
                  <span style={{ color: "red", fontWeight: "normal" }}>
                    Failed
                  </span>
                </>
              )}
            </td>
            <td>
              <button
                className="btn btn-outline-primary btn-sm"
                style={{ width: "4rem", height: "40px" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/products/myorder/view", {
                    state: { id: props._id },
                  });
                }}
              >
                View
              </button>
            </td>
          </tr>
        </>
      )}
    </>
  );
}

export default Myorder_card;