import axios from 'axios';


const axiosInstance = axios.create({
    /***
     * FAKE-JSON-SERVER ====> https://github.com/typicode/json-server
     * (for run this service, run this command on CLI in project root => `json-server --watch db.json --port 3001`)
     * */
    baseURL: `http://127.0.0.1:3001/`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;
