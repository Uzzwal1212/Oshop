import React from "react";
import NavBar from "./component/NavBar/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./component/Home/home";
import ShoppingCart from "./component/Cart/cart";
import MyOrders from "./component/MyOrders/orders";
import ManageOrders from "./component/ManageOrders/manageOrders";
import ManageProducts from "./component/ManageProducts/manageProducts";
import SignIn from "./component/SignIn/signIn";
import SignUp from "./component/SignUp/signUp";
import ProtectedRoutes from "./protectedRoutes";
import LoggedInRoutes from "./loggedInRoutes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NewProduct from "./component/NewProduct/newProduct";
import Checkout from "./component/Checkout/checkout";
import GoogleAuth from "./component/GoogleAuth/googleAuth";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <main>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/cart" component={ShoppingCart}></Route>
          <Route path="/login/google" component={GoogleAuth}></Route>
          <ProtectedRoutes path="/checkout" component={Checkout} isAuth />
          <ProtectedRoutes path="/my/orders" component={MyOrders} isAuth />
          <ProtectedRoutes
            path="/admin/orders"
            component={ManageOrders}
            isAuth
          />
          <ProtectedRoutes
            path="/admin/product/new"
            component={NewProduct}
            isAuth
          />
          <ProtectedRoutes
            path="/admin/product/:id"
            component={NewProduct}
            isAuth
          />
          <ProtectedRoutes
            path="/admin/products"
            component={ManageProducts}
            isAuth
          />
          <LoggedInRoutes path="/signIn" component={SignIn} isAuth />
          <LoggedInRoutes path="/signUp" component={SignUp} isAuth />
          <LoggedInRoutes path="/adminSignIn" component={SignIn} isAuth />
          <LoggedInRoutes path="/adminSignUp" component={SignUp} isAuth />
          <Redirect from="/" exact to="/home"></Redirect>
        </Switch>
      </main>
    </div>
  );
}

export default App;
