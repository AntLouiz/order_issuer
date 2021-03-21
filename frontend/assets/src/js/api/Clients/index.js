import API from '../settings';


export function getClients(handler) {
    let endpoint = '/clients/'
    API.get(endpoint).then((response) => {
        handler(response.data)
    })
}

export default {
    getClients
}