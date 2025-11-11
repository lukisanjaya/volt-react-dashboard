import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://dummyjson.com',
      headers: { 'Content-Type': 'application/json' }
    });

    this.api.interceptors.request.use(config => {
      const token = localStorage.getItem('accessToken');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  async login(username, password) {
    const { data } = await this.api.post('/auth/login', { username, password });
    
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    
    return data;
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const { data } = await this.api.post('/auth/refresh', { refreshToken });
    return data;
  }

  async getProducts(params = {}) {
    const { data } = await this.api.get('/products', { params });
    return data;
  }

  async getProduct(id) {
    const { data } = await this.api.get(`/products/${id}`);
    return data;
  }

  async createProduct(product) {
    const { data } = await this.api.post('/products/add', product);
    return data;
  }

  async updateProduct(id, product) {
    const { data } = await this.api.put(`/products/${id}`, product);
    return data;
  }

  async deleteProduct(id) {
    const { data } = await this.api.delete(`/products/${id}`);
    return data;
  }

  async getMe() {
    const { data } = await this.api.get('/auth/me');
    return data;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export default new ApiService();