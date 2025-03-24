import axios from "axios";

const AxiosApi = axios.create({
    baseURL: 'https://backend-koa.onrender.com/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AxiosApi;