import { adminActions } from "../actionTypes"

export const adminSignUpInitiate = (data) => ({
    type: adminActions.ADMIN_SIGN_UP_INITIATE,
    payload: data
})

export const adminSignUpSuccess = (data) => ({
    type: adminActions.ADMIN_SIGN_UP_SUCCESS,
    payload: data
})

export const adminSignUpFailure = (data) => ({
    type: adminActions.ADMIN_SIGN_UP_FAILURE,
    payload: data
})

export const adminLoginInitiate = (data) => ({
    type: adminActions.ADMIN_LOGIN_INITIATE,
    payload: data
})

export const adminLoginSuccess = (data) => ({
    type: adminActions.ADMIN_LOGIN_SUCCESS,
    payload: data
})

export const adminLoginFailure = (data) => ({
    type: adminActions.ADMIN_LOGIN_FAILURE,
    payload: data
})

export const clearAdminSignUpData = (data) => ({
    type: adminActions.CLEAR_ADMIN_SIGN_UP,
    payload: data
})

export const clearAdminLoginData = () => ({
    type: adminActions.CLEAR_ADMIN_LOGIN_DATA,
})