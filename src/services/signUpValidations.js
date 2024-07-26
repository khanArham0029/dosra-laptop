import validation from './validation'
export default class signUpValidations {
  constructor(email, password) {
    this.email = email
    this.password = password
  }
  checkValidations() {
    let errors = [] //error array to store errors
    if (!validation.checkEmail(this.email)) {
      errors['email'] = 'Invalid email address'
    }
    if (!validation.minLength(this.password, 6)) {
      errors['password'] = 'Password must be at least 6 characters'
    }
    return errors
  }
  static getErrorMessageFromCode(errorCode) {
    console.log(`Error Code Received: ${errorCode}`) // Log the errorCode
    switch (errorCode) {
      case 'EMAIL_EXISTS':
        return 'Email already exists'
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found'
      case 'INVALID_PASSWORD':
        return 'Invalid Password'
      case 'INVALID_LOGIN_CREDENTIALS':
        return 'Either Wrong Email or Password'
      default:
        return 'Unexpected error occurred. Please try again'
    }
  }
}
