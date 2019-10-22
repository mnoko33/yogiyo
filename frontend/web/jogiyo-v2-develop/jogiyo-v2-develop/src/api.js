import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(function(config) {
  // localStorage에서 token을 불러와서
  // 다음 번 요청부터 헤더에 토큰을 자동으로 포함시킴
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    // 헤더에 어떻게 포함시킬지를 지정
    config.headers['Authorization'] = 'Token ' + token;
  }
  return config;
});

export default api;
