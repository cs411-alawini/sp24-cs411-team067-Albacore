import axios from "axios";

// This is pure javascript

// If .env set, other default to local
const HTTPCLIENT_BASE_URL = process.env.HTTPCLIENT_BASE_URL || "http://localhost:8000/api";

console.log("HTTPCLIENT_BASE_URL: " + HTTPCLIENT_BASE_URL);

const httpClient = axios.create({
    baseURL: HTTPCLIENT_BASE_URL,
});

httpClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // JS Promise is async
    return Promise.resolve({ error });
});

export default httpClient;