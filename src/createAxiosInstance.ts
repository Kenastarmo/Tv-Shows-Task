import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: { 'Authorization': '50f34a5a024fe46d03c9989497275a4a' }
});

export default axiosInstance;