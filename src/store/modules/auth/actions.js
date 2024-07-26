import axios from 'axios' // Import the default axios instance
import { SIGNUP_ACTION } from '/src/store/storeConsts.js'
import { LOGIN_ACTION, SET_USER_TOKEN_DATA_MUTATION } from '../../storeConsts.js'
import signUpValidations from '../../../services/signUpValidations.js'

export default {
  async [LOGIN_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    }
    let response = ''
    try {
      response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIlECz2fZyKKLB4rjS1ekXyhp0LGecwHg',
        postData
      )
      if (response.status === 200) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
          userId: response.data.localId
        })
      }
    } catch (error) {
      let errorMessage = signUpValidations.getErrorMessageFromCode(
        error.response.data.error.errors[0].message
      )
      throw errorMessage
    }
  },
  async [SIGNUP_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    }
    let response = ''
    try {
      response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIlECz2fZyKKLB4rjS1ekXyhp0LGecwHg',
        postData
      )
      if (response.status === 200) {
        //hi
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
          userId: response.data.localId
        })
      }
    } catch (error) {
      let errorMessage = signUpValidations.getErrorMessageFromCode(
        error.response.data.error.errors[0].message
      )
      throw errorMessage
    }
  }
}
