import ApiService from './api.service'

export default class UserService {
  static async getUsers () {
    const apiService = new ApiService('http://localhost:5000/api/v1')

    const getDeck = await apiService.get('/user')

    return getDeck
  }

  static async createUsers (name) {
    const apiService = new ApiService('http://localhost:5000/api/v1')

    const createUsers = await apiService.post('/user', { name })

    return createUsers
  }

  static async saveScore ({ playerId, noOfTurn }) {
    const apiService = new ApiService('http://localhost:5000/api/v1')

    const saveScore = await apiService.put(`/user/${playerId}`, { score: noOfTurn })

    return saveScore
  }
}
