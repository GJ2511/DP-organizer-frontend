import ApiService from './api.service'

export default class DeckService {
  static async getDeck () {
    const apiService = new ApiService('https://deckofcardsapi.com/api/deck')

    const getDeck = await apiService.get('/new/shuffle/?deck_count=1')

    return getDeck
  }

  static async getCards (deckId, count = 9) {
    const apiService = new ApiService('https://deckofcardsapi.com/api/deck')

    const getCards = await apiService.get(`/${deckId}/draw/?count=${count}`)

    return getCards
  }
}
