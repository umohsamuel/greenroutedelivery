import axios from "axios";
// import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  // withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     if (typeof window !== "undefined") {
//       const token = (await cookies()).get("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
