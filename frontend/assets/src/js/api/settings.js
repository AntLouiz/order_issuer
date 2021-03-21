import axios from 'axios';

let url;

if (API_URL) {
    url = API_URL
} else {
    url = 'http://localhost:8000/api/'
}

export default axios.create({
    baseURL: url
});