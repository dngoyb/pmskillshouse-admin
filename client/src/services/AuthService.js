import Api from './Api'

export default {
  signup(credentials) {
    return Api().post('signup', credentials)
  },
  signin(credentials) {
    return Api().post('login', credentials)
  }
}
