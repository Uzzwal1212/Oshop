import gql from "graphql-tag";
import { put } from "redux-saga/effects";
import { client } from "../../component/AolloClient";
import {
  adminSignUpFailure,
  adminSignUpSuccess,
  adminLoginFailure,
  adminLoginSuccess,
} from "../Actions/admin";

export function* adminSignUpSaga({ payload }) {
  try {
    const adminSignUp = gql`
      mutation fields(
        $name: String!
        $email: String!
        $password: String!
        $userType: String!
      ) {
        createAdmin(
          name: $name
          email: $email
          password: $password
          userType: $userType
        ) {
          _id
          name
          email
          userType
        }
      }
    `;
    const result = yield client.mutate({
      mutation: adminSignUp,
      variables: payload,
    });
    yield put(adminSignUpSuccess(result));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(adminSignUpFailure(errorString));
  }
}

export function* adminLoginSaga({ payload }) {
  try {
    const adminLogin = gql`
      mutation fields($email: String!, $password: String!) {
        adminLogin(email: $email, password: $password) {
          admin {
            _id
            name
            email
            userType
          }
          token
        }
      }
    `;
    const result = yield client.mutate({
      mutation: adminLogin,
      variables: payload,
    });
    yield put(adminLoginSuccess(result.data.adminLogin));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(adminLoginFailure(errorString));
  }
}
