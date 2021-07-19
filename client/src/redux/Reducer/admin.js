import { adminActions } from "../actionTypes";

const initialState = {
    adminSignUpLoader: false,
    error: '',
    adminSignUp: '',
    adminLoginSuccess: false,
    adminLogin: {},
    adminLoginLoader: false
}

export default function AdminAuthentication(state=initialState, action){
  const {payload, type} = action

    switch (type) {
      case adminActions.ADMIN_SIGN_UP_INITIATE:
        return {
          ...state,
          adminSignUpLoader: true,
        }
      
      case adminActions.ADMIN_SIGN_UP_SUCCESS:
        return {
          ...state,
          adminSignUpLoader: false,
          adminSignUp: payload,   
        }
      case adminActions.ADMIN_SIGN_UP_FAILURE:
        return {
          ...state,
          adminSignUpLoader: false,
          error: payload,
          adminSignUp: '' 
        }

      case adminActions.ADMIN_LOGIN_INITIATE:
        return {
          ...state,
          adminLoginLoader: true
        }

      case adminActions.ADMIN_LOGIN_SUCCESS:
        return {
          ...state,
          adminLoginLoader: false,
          adminLogin: payload,
          adminLoginSuccess: true
        }

      case adminActions.ADMIN_LOGIN_FAILURE:
        return {
          ...state,
          adminLoginLoader: false,
          error: payload
        }

      case adminActions.CLEAR_ADMIN_SIGN_UP:
        return {
          ...state,
          adminSignUp:'',
          error: '',
        }

      case adminActions.CLEAR_ADMIN_LOGIN_DATA:
        return {
          ...state,
          adminLogin:{},
          error: '',
          adminLoginSuccess: true
        }
        
        default:
           return state
    }
}