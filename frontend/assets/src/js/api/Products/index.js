import API from '../settings';


export function getProducts(setAppState) {
    let endpoint = '/products/'
    API.get(endpoint).then((response) => {
        const products = response.data;
        setAppState((prevState) => { return {...prevState, products: products}})
    })
}

export default {
    getProducts
}