import axios from 'axios';

let url;

if (process.env.API_URL) {
    url = process.env.API_URL
} else {
    url = 'http://localhost:8000/api/'
}

export default axios.create({
    baseURL: url
});