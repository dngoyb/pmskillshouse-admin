import Api from './Api'

export default {
  adminRegistration(credentials) {
    return Api().post('/users/signup', credentials)
  },
  trainerRegistration(credentials) {
    return Api().post('/users/register', credentials)
  },
  signin(credentials) {
    return Api().post('/users/login', credentials)
  },
  addCourse(credentials) {
    return Api().post('/courses/create', credentials)
  },
  getAllTrainers() {
    return Api().get('/users/getUsers')
  },

}
