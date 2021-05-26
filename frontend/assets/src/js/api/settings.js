import axios from 'axios'

let url

if (API_URL) {
    url = API_URL
} else {
    url = 'http://localhost:8000/api/'
}

export const PAGE_SIZE = 5

export const REQUEST_TIMEOUT = 80000

export const RENTABILITY_CHOICES = {
    'GREAT': 'Ótima',
    'GOOD': 'Boa',
    'BAD': 'Ruim'
}

export default axios.create({
    baseURL: url
})