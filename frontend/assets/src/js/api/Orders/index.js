import API from '../settings';


export function getOrders(setAppState) {
    let endpoint = '/orders/'
    API.get(endpoint).then((response) => {
        const orders = response.data;
        setAppState((prevState) => { return {...prevState, orders: orders}})
    })
}

export function getOrderItems(setAppState, order) {
    let endpoint = `/orders/${order}/items`
    API.get(endpoint).then((response) => {
        const items = response.data
        setAppState((prevState) => {
            const currentOrder = {...prevState.currentOrder, items: items}
            return {...prevState, currentOrder: currentOrder}
        })
    })
}

export function getCurrentClientOrder(setAppState, clientId, handler, handlerError) {
    let endpoint = `/orders/clients/${clientId}/current/`
    API.get(endpoint).then((response) => {
        const currentOrderId = response.data.id
        let currentOrder = {pk: currentOrderId, items:[]}
        setAppState((prevState) => { return {...prevState, currentOrder: currentOrder}})
        getOrderItems(setAppState, currentOrderId)
        handler()
    }).catch((error) => {
        handlerError()
    })
}

export function postItem(setAppState, item, handler) {
    let endpoint = '/items/'
    API.post(endpoint, item).then((response) => {
        let item = response.data
        setAppState((prevState) => {
            let items = [item]
            if (prevState.currentOrder.items) {
                items = [...prevState.currentOrder.items, item]
            }
            let currentOrder = {...prevState.currentOrder, items: items}
            return {...prevState, currentOrder: currentOrder}
        })
        handler()
    })
}

export function updateItem(setAppState, item, handler) {
    let endpoint = `/items/${item.id}/`
    API.patch(endpoint, item).then(() => {
        setAppState((prevState) => {
            let order = prevState.currentOrder
            let alertMessage = {}
            order.items.forEach((element, index) => {
                if (element.id == item.id) {
                    order.items[index] = item
                    alertMessage['message'] = 'Item atualizado'
                    alertMessage['severity'] = 'info'
                }
            })

            return {...prevState, currentOrder: order, alertMessage: alertMessage}
        })
        handler()
    })
}

export function postOrder(setAppState, client, item=null) {
    let endpoint = '/orders/'
    let data = {
        client: client
    }

    API.post(endpoint, data).then((response) => {
        let currentOrder = {
            pk: response.data.id
        }
        if (item) {
            item['order'] = currentOrder.pk
            postItem(setAppState, item)
        }
        setAppState((prevState) => { return {...prevState, currentOrder: currentOrder}})
    })
}

export function closeOrder(setAppState, order, handler, handlerError) {
    let endpoint = `/orders/${order}/`
    let data = {is_closed: true}
    API.patch(endpoint, data).then(() => {
        setAppState((prevState) => {return {...prevState, currentOrder: {pk: null, items: []}}})
        handler()
    }).catch(() => handlerError())
}

export default {
    getOrders,
    getCurrentClientOrder,
    postOrder,
    closeOrder
}