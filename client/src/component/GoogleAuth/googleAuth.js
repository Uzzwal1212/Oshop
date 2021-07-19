import React, { useEffect } from "react";
import axios from "axios";
import Loader from "../comman/Loader";
import { LoaderWrapper } from "./styles";
import useQuery from "../hooks/useQuery";
import { useHistory } from "react-router-dom";

const GoogleAuth = () => {
  const query = useQuery();
  const history = useHistory();
  const token = query.get("jwt");
  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:5000/token/verifyToken", { token })
        .then((res) => {
          console.log("ress", res);
          if (!res.data) {
            return history.push("/login");
          }

          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(res.data));
          history.push("/home");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
};

export default GoogleAuth;
