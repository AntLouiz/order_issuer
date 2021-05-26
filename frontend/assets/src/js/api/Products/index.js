import API from '../settings';


export function getProducts(setAppState, searchText=null) {
    let endpoint = '/products/'

    if (searchText) {
        endpoint = `${endpoint}?name=${searchText}`
    }

    API.get(endpoint).then((response) => {
        const products = response.data;
        setAppState((prevState) => { return {...prevState, products: products, isLoading: false}})
    })
}

export default {
    getProducts
}