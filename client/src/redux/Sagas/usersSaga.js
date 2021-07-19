import gql from "graphql-tag"
import { put } from "redux-saga/effects"
import { client } from "../../component/AolloClient/index"
import { userSignUpFailure, userSignUpSuccess, userLoginSuccess, userLoginFailure} from "../Actions/users"
 
export function* userSignUpSaga({payload}) {
  try {
    const userSignUp = gql`
      mutation fields($name:String!,$email:String!, $password:String!){
        createUser(
          name: $name
          email: $email
          password: $password
        ){
          _id
          name
          email
        }
      } 
    `
      const result = yield client.mutate({
        mutation: userSignUp,
        variables: payload
      })
      yield put(userSignUpSuccess(result))
  } catch (error) {
    const errorString = error.graphQLErrors[0].message
    yield put(userSignUpFailure(errorString))

  }
}

export function* userLoginSaga({payload}) {
  try {
    const userLogin = gql`
    mutation fields($email: String!, $password: String!){
      userLogin(
        email: $email,
        password: $password
      ){
        user{
          _id,
          name,
          email,
        },
        token
      }
    } 
    `
    const result = yield client.mutate({
      mutation: userLogin,
      variables: payload
    })
    yield put(userLoginSuccess(result.data.userLogin))
  }catch(error) {
    const errorString = error.graphQLErrors[0].message
    yield put (userLoginFailure(errorString))
  }
}