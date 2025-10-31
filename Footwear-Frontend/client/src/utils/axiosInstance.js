// import axios from "axios";


// const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.BASE_URL}`,
// });

// export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Correct one
});

export default axiosInstance;
