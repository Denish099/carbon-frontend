import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://profound-hotteok-8595e1.netlify.app/",
  withCredentials: true,
});

export default axiosInstance;
