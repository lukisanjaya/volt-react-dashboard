import axios from 'axios';

class DragonBallApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://dragonball-api.com/api',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getCharacters(params = {}) {
    const { data } = await this.api.get('/characters', { params });
    return data;
  }

  async getCharacter(id) {
    const { data } = await this.api.get(`/characters/${id}`);
    return data;
  }
}

export default new DragonBallApiService();