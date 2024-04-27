import axios from "axios";
// If .env set, other default to local
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000/api";
// const REACT_APP_BASE_URL = "https://campuscache.com:8000/api";
console.log("HTTPCLIENT_BASE_URL: " + REACT_APP_BASE_URL);

const httpClient = axios.create({
    baseURL: REACT_APP_BASE_URL,
});

httpClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // JS Promise is async
    return Promise.resolve({ error });
});

export default httpClient;