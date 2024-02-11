import logo from './logo.svg';
import './App.css';
import axios from "axios";

const HTTPCLIENT_BASE_URL = "http://localhost:8000/"

const [sampleMsg, setSampleMsg] = useState("START");

const httpClient = axios.create({
  baseURL: HTTPCLIENT_BASE_URL,
});

httpClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.resolve({ error});
});

const getRequest = (context) => {
  httpClient
    .get("/", formData, {
      headers: { Authorization: "token " + localStorage.getItem("token") },
    })
    .then((response) => {
      setSampleMsg("END");
    })
    .catch((error) => {
      const msg = "Error on health check route" + error;
      _log.error(msg);
    });
}




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          msg here: {sampleMsg}
        </p>
        <button onclick="">Click</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
