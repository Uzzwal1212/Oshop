import styled from "styled-components";
import img from "../../Image/resize-16140978171911660232marcospauloprado0py70yxumAkunsplash.jpg"

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 56px);
`;

export const ButtonWrapper = styled.button`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  border: none;
  position: absolute;
`;

export const LoginWrapper = styled.main`
  border: 1px solid #eef2f1;
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  box-shadow: 0 5px 5px rgb(0 0 0 / 20%);
`;

export const AccountWrapper = styled.p`
  position: absolute;
  left: 55%;
  top: 87%;
  font-size: 14px;
  transform: translate(2%, 0%);
`;

export const WelcomeWrapper = styled.div`
border: 1px solid #eef2f1;
width: 40%;
height: 100%;
background-image: url(${img});
border-radius: 15px;
background-size: cover;
`;