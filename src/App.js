import React from "react";
import Home from "./partials/home"
import Login from "./partials/login";
import Register from "./partials/register"
import Forget from "./partials/forgetPassword";
import DashBoard from "./component/dashboard";
import AddProduct from "./component/addProduct";
import Myproduct from "./component/myproduct";
import Cart from "./component/cart";
import DashoboardDetails from "./details/dashboardDetails";
import MyProductDetails from "./details/myProductDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Update from "./updates/myproducts_updates";
import MyOrder from "./component/myorder";
import Myorder_Intermediate from "./cards/myorder_Intermediate";
import User from "./adminside/user.js";
import UserDetails from "./adminside/userDetails.js";
import ProductDetails from "./adminside/product.js";
import Stats from "./component/stats.js";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forget" element={<Forget />}></Route>
          <Route path="/users/details" element={<UserDetails />}></Route>
          <Route exact path="/admin/stats/" element={<Stats />}></Route>
          <Route exact path="/admin/user/" element={<User />}></Route>
          <Route exact path="/admin/product/" element={<ProductDetails />}></Route>
          <Route exact path="/products/" element={<DashBoard />}></Route>
          <Route exact path="/products/add/" element={<AddProduct />}></Route>
          <Route exact path="/products/myproducts/" element={<Myproduct />}></Route>
          <Route exact path="/products/update/" element={<Update />}></Route>
          <Route exact path="/products/cart/" element={<Cart />}></Route>
          <Route exact path="/products/details/" element={<DashoboardDetails />}></Route>
          <Route exact path="/products/details/myproduct" element={<MyProductDetails />}></Route>
          <Route exact path="/products/myorder" element={<MyOrder />}></Route>
          <Route exact path="/products/myorder/view" element={<Myorder_Intermediate />}></Route>
        </Routes>
      </Router>
    </>
  );
}


export default App;
