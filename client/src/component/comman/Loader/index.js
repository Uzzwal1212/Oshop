import React from "react";
import { LoaderWrapper,Wrapper } from "./styles";
const Loader = () => {
  return (
    <Wrapper>
      <LoaderWrapper className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </LoaderWrapper>
    </Wrapper>
  );
};

export default Loader;
