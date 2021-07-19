import { userActions } from "../actionTypes";

const initialState = {
  userSignUpLoader: false,
  error: "",
  userSignUp: "",
  userLogin: {},
  userLoginSuccess:false,
  userLoginLoader: false,
};

export default function UserAuthentication(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case userActions.USER_SIGN_UP_INITIATE:
      return {
        ...state,
        userSignUpLoader: true,
      };

    case userActions.USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        userSignUpLoader: false,
        userSignUp: payload,
      };
    case userActions.USER_SIGN_UP_FAILURE:
      return {
        ...state,
        userSignUpLoader: false,
        error: payload,
        userSignUp: "",
      };

    case userActions.USER_LOGIN_INITIATE:
      return {
        ...state,
        userLoginLoader: true,
      };

    case userActions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginLoader: false,
        userLogin: payload,
        userLoginSuccess:true
      };

    case userActions.USER_LOGIN_FAILURE:
      return {
        ...state,
        userLoginLoader: false,
        error: payload,
      };

    case userActions.CLEAR_USER_SIGN_UP:
      return {
        ...state,
        userSignUp: "",
        error: "",
      };

    case userActions.CLEAR_USER_LOGIN_DATA:
      return {
        ...state,
        userLogin: {},
        error: "",
      };

    default:
      return state;
  }
}
