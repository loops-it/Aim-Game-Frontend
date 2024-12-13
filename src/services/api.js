import axios from 'axios';
import { BASE_API_URL } from './config';


export const api = axios.create({
    baseURL: "https://aim-game-backend-beta.vercel.app",
});


api.interceptors.request.use(
    async function (config) {
        const token = localStorage.accessToken
        config.headers.Authorization = "Bearer " + token;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.code == "ERR_NETWORK") {
            window.location.href = "/"
        }

        if (error?.response?.status === 401) {
            localStorage.clear()
            window.location.href = "/"
        }
        if (error?.response?.status === 400) { /* empty */ }
        return Promise.reject(error.response.data.message);
    }
);

export default api;
