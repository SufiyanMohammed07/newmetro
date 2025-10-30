import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3030/api", // same backend
// });

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export default axiosInstance;
