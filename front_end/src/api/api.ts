import axios from "axios";

const api = axios.create({ timeout: 150000 });

api.interceptors.request.use(async (config) => {
  //ler do .env a porta do back_end
  config.baseURL = "http://localhost:5200";

  return config;
});

export default api;
