import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"; // URL API Laravel kamu
axios.defaults.withCredentials = true; // Izinkan pengiriman credentials (cookies)
axios.defaults.withXSRFToken = true;
export default axios;
export function getBaseUrl() {
  return axios.defaults.baseURL;
}
