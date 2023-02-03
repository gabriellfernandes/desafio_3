import axios from "axios";

export const baseURL = "/api/";

const api = axios.create({
  baseURL: baseURL,
});

export default api;