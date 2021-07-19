import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getMemoizedUserData } from "../../redux/Selectors/users";
import { getMemoizedAdminData } from "../../redux/Selectors/admin";
import validations from "../../common/validations/index";
import Loader from "../comman/Loader/index";
import {
  userSignUpInitiate,
  clearUserSignUpData,
} from "../../redux/Actions/users";
import {
  adminSignUpInitiate,
  clearAdminSignUpData,
} from "../../redux/Actions/admin";

import {
  LoaderWrapper,
  ButtonWrapper,
  AccountWrapper,
  LoginWrapper,
  WelcomeWrapper,
} from "./styles";

const { emailValidate, requiredValidate, createPasswordValidate } = validations;

const SignUp = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { userSignUpLoader, userSignUp } = useSelector(getMemoizedUserData);
  const { adminSignUp, adminSignUpLoader } = useSelector(getMemoizedAdminData);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === "/signUp") {
      if (userSignUp) {
        toast.success("Signed Up successfully");
        history.push("/signIn");
        dispatch(clearUserSignUpData());
      }
    }
  }, [userSignUp, history, dispatch, location]);

  useEffect(() => {
    if (location.pathname === "/adminSignUp") {
      if (adminSignUp) {
        toast.success("Signed Up successfully");
        history.push("/adminSignIn");
        dispatch(clearAdminSignUpData());
      }
    }
  }, [adminSignUp, history, dispatch, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    const errorsObject = {
      name: requiredValidate(name),
      email: emailValidate(email),
      password: createPasswordValidate(password),
    };

    if (!errorsObject.name && !errorsObject.email && !errorsObject.password) {
      if (location.pathname === "/signUp") {
        dispatch(userSignUpInitiate({ ...user }));
      } else if (location.pathname === "/adminSignUp") {
        dispatch(adminSignUpInitiate({ ...user, userType: "admin" }));
      }
    }
    setErrors(errorsObject);
  };

  const handleInputChange = ({ target, data }) => {
    const { name, value } = data || target;
    setUser({ ...user, [name]: value });
  };

  const handlepageChange = () => {
    history.push("/signIn");
  };

  return (
    <React.Fragment>
      {userSignUpLoader || adminSignUpLoader ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <LoginWrapper>
          <WelcomeWrapper>
            <h2 id="welcome">Welcome to Oshop</h2>
          </WelcomeWrapper>
          <div className="signUp-form">
            <form onSubmit={handleSubmit}>
              <h2 id="create-account">Sign Up</h2>
              <div className="form-group">
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className={
                      errors.name
                        ? "form-control input-style validation"
                        : "form-control input-style"
                    }
                    name="name"
                    onChange={handleInputChange}
                    value={user.name}
                    placeholder="Name"
                  />
                  {errors.name ? (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  ) : null}
                </div>
                <label htmlFor="email">Email address</label>
                <input
                  className={
                    errors.email
                      ? "form-control input-style validation"
                      : "form-control input-style"
                  }
                  name="email"
                  onChange={handleInputChange}
                  value={user.email}
                  placeholder="Enter email"
                />
                {errors.email ? (
                  <div style={{ color: "red" }}>{errors.email}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  className={
                    errors.password
                      ? "form-control input-style validation"
                      : "form-control input-style"
                  }
                  name="password"
                  onChange={handleInputChange}
                  value={user.password}
                  placeholder="Password"
                />
                {errors.password ? (
                  <span style={{ color: "red" }}>{errors.password}</span>
                ) : null}
              </div>
              <button type="submit" className="btn btn-sign-in">
                Sign Up
              </button>
              <AccountWrapper>
                Already have an account?
                <ButtonWrapper onClick={handlepageChange}>
                  Sign In
                </ButtonWrapper>
              </AccountWrapper>
              {errors && <p>{errors.error}</p>}
            </form>
          </div>
        </LoginWrapper>
      )}
    </React.Fragment>
  );
};

export default SignUp;
