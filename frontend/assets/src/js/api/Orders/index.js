import API from '../settings';


export function getClientOrders(setAppState, clientId) {
    let endpoint = `/orders/clients/${clientId}/`
    API.get(endpoint).then((response) => {
        const orders = response.data;
        setAppState((prevState) => { return {...prevState, orders: orders}})
    })
}

export function getOrderItems(setAppState, orderId) {
    let endpoint = `/orders/${orderId}/items/`
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

export function postItem(setAppState, item, handler=null) {
    let endpoint = '/items/'
    API.post(endpoint, item).then((response) => {
        let item = response.data
        setAppState((prevState) => {
            let items = [item]
            let alertMessage = {
                message: 'Item adicionado à sacola',
                severity: 'success'
            }
            if (prevState.currentOrder.items) {
                items = [...prevState.currentOrder.items, item]
            }
            let currentOrder = {...prevState.currentOrder, items: items}
            return {...prevState, alertMessage: alertMessage, currentOrder: currentOrder}
        })
        handler && handler()
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

export function removeItem(setAppState, item, handler) {
    let endpoint = `/items/${item.id}/`
    API.delete(endpoint, item).then(() => {
        setAppState((prevState) => {
            let items = []
            let alertMessage = {
                message: 'Item removido',
                severity: 'success'
            }
            if (prevState.currentOrder.items) {
                items = prevState.currentOrder.items.filter(e => e.id != item.id)
            }
            let currentOrder = {...prevState.currentOrder, items: items}
            return {...prevState, alertMessage: alertMessage, currentOrder: currentOrder}
        })
        handler && handler()
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

export function closeOrder(setAppState, orderId, handler, handlerError) {
    let endpoint = `/orders/${orderId}/`
    let data = {is_closed: true}
    API.patch(endpoint, data).then(() => {
        setAppState((prevState) => {return {...prevState, currentOrder: {pk: null, items: []}}})
        handler()
    }).catch(() => handlerError())
}

export default {
    getCurrentClientOrder,
    getClientOrders,
    postOrder,
    removeItem,
    closeOrder
}