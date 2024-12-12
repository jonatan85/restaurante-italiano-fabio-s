import axios from "axios";

const AxiosApi = axios.create({
    baseURL: 'http://localhost:3000/pizzas',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AxiosApi;