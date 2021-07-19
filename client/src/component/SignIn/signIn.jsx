import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../comman/Loader";
import { getMemoizedUserData } from "../../redux/Selectors/users";
import { getMemoizedAdminData } from "../../redux/Selectors/admin";
import validations from "../../common/validations/index";
import {
  userLoginInitiate,
  clearUserLoginData,
  userLoginFailure,
} from "../../redux/Actions/users";

import {
  adminLoginInitiate,
  adminLoginFailure,
  clearAdminLoginData,
} from "../../redux/Actions/admin";

import { LoaderWrapper, LoginWrapper, WelcomeWrapper } from "./styles";

const { emailValidate, requiredValidate } = validations;

const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { userLogin, userLoginLoader, error } =
    useSelector(getMemoizedUserData);
  const {
    adminLogin,
    adminLoginLoader,
    error: adminError,
  } = useSelector(getMemoizedAdminData);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (error || adminError) return toast.error("Invalid email or password");
  }, [error, adminError]);

  useEffect(() => {
    if (location.pathname === "/signIn") {
      if (Object.keys(userLogin).length > 0) {
        localStorage.setItem("userToken", userLogin.token);
        localStorage.setItem("userData", JSON.stringify(userLogin.user));
        toast.success("Signed In successfully");
        history.push("/home");
        dispatch(clearUserLoginData());
      }
    }
  }, [userLogin, history, dispatch, location]);

  useEffect(() => {
    if (location.pathname === "/adminSignIn") {
      if (Object.keys(adminLogin).length > 0) {
        localStorage.setItem("adminToken", adminLogin.token);
        localStorage.setItem("adminData", JSON.stringify(adminLogin.admin));
        toast.success("Signed In successfully");
        history.push("/home");
        dispatch(clearAdminLoginData());
      }
    }
  }, [adminLogin, history, dispatch, location]);

  const handleInputChange = ({ target, data }) => {
    const { name, value } = data || target;

    setUser({ ...user, [name]: value });
  };

  const handleGoogleLogin = () => {
    window.location =
      "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Foauth%2Fgoogle&prompt=consent&response_type=code&client_id=122020144503-8lq77r4p3te1ogl2q30tnbocs8t4qrvd.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    const errorsObject = {
      email: emailValidate(email),
      password: requiredValidate(password),
    };
    if (!errorsObject.name && !errorsObject.email && !errorsObject.password) {
      if (location.pathname === "/signIn") {
        dispatch(userLoginInitiate({ ...user }));
        dispatch(clearUserLoginData());
      } else if (location.pathname === "/adminSignIn") {
        dispatch(adminLoginInitiate({ ...user }));
        dispatch(clearAdminLoginData());
      }
    } else {
      if (location.pathname === "/signIn") {
        dispatch(userLoginFailure());
      } else if (location.pathname === "/adminSignIn") {
        dispatch(adminLoginFailure());
      }
    }
    setErrors(errorsObject);
  };

  return (
    <React.Fragment>
      {userLoginLoader || adminLoginLoader ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <LoginWrapper>
          <WelcomeWrapper>
            <h2 id="welcome">Welcome to Oshop</h2>
          </WelcomeWrapper>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <h2 id="login">Sign In</h2>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className={
                    errors.email
                      ? "form-control input-style validation"
                      : "form-control input-style"
                  }
                  placeholder="Enter email"
                  onChange={handleInputChange}
                  name="email"
                  value={user.email}
                />
                {errors.email ? (
                  <div style={{ color: "red" }}>{errors.email}</div>
                ) : null}
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={
                    errors.password
                      ? "form-control input-style validation"
                      : "form-control input-style"
                  }
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
                {errors.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : null}
              </div>
              <button type="submit" className="btn btn-sign-in">
                Sign In
              </button>
              <p className="new-here">
                New here? <Link to="/signUp">Create an account</Link>
              </p>
            </form>
            <p className="or">or</p>
            <div className="googleLogin">
              <button className="btn btn-primary" onClick={handleGoogleLogin}>
                Login With google
              </button>
            </div>
          </div>
        </LoginWrapper>
      )}
    </React.Fragment>
  );
};

export default SignIn;
