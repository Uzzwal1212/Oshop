import  { userActions } from "../actionTypes"

export const userSignUpInitiate = (data) => ({
    type: userActions.USER_SIGN_UP_INITIATE,
    payload: data
})

export const userSignUpSuccess = (data) => ({
    type: userActions.USER_SIGN_UP_SUCCESS,
    payload: data
})

export const userSignUpFailure = (data) => ({
    type: userActions.USER_SIGN_UP_FAILURE,
    payload: data
})

export const userLoginInitiate = (data) => ({
    type: userActions.USER_LOGIN_INITIATE,
    payload: data
})

export const userLoginSuccess = (data) => ({
    type: userActions.USER_LOGIN_SUCCESS,
    payload: data
})

export const userLoginFailure = (data) => ({
    type: userActions.USER_LOGIN_FAILURE,
    payload: data
})

export const clearUserSignUpData = (data) => ({
    type: userActions.CLEAR_USER_SIGN_UP,
    payload: data
})

export const clearUserLoginData = (data) => ({
    type: userActions.CLEAR_USER_LOGIN_DATA,
    payload: data
})