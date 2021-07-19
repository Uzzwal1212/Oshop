import { createSelector } from "reselect"

export const getMemoizedAdminData = createSelector(
    (state) => state.admin,
    (adminState) => {
      const {
        adminSignUpLoader,
        adminLoginLoader,
        adminSignUp,
        adminLogin,
        error,
        adminLoginSuccess
      } = adminState
  
      return {
        adminSignUpLoader,
        adminLoginLoader,
        adminSignUp,
        adminLogin,
        error,
        adminLoginSuccess
      }
    }
  )
