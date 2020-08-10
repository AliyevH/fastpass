import axios from 'axios';


const axiosInstance = axios.create({
    /***
     * FAKE-JSON-SERVER ====> https://github.com/typicode/json-server
     * (for run this service, run this command on CLI in project root => `json-server --watch db.json --port 3001`)
     * */
    baseURL: `http://localhost:8000/`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;
