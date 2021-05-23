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
        const items = response.data.reverse()
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
    let alertMessage = {
        message: 'Item adicionado à sacola',
        severity: 'success'
    }

    function alertErrorMessage(message) {
        alertMessage['message'] = message
        alertMessage['severity'] = 'error'
        setAppState((prevState) => {
            return {...prevState, alertMessage: alertMessage}
        })
        return false
    }

    API.post(endpoint, item).then((response) => {
        let item = response.data
        if (item.rentability === "BAD") {
            return alertErrorMessage('Item com rentabilidade ruim.')
        }
        setAppState((prevState) => {
            let items = [item]
            if (prevState.currentOrder.items) {
                items = [...prevState.currentOrder.items, item]
            }
            let currentOrder = {...prevState.currentOrder, items: items}
            return {...prevState, alertMessage: alertMessage, currentOrder: currentOrder}
        })
        handler && handler()
    }).catch(() => {
        return alertErrorMessage('Item com rentabilidade ruim.')
    })
}

export function updateItem(setAppState, item, handler) {
    let endpoint = `/items/${item.id}/`
    let alertMessage = {
        message: 'Item atualizado',
        severity: 'info'
    }

    function alertErrorMessage(message) {
        alertMessage['message'] = message
        alertMessage['severity'] = 'error'
        setAppState((prevState) => {
            return {...prevState, alertMessage: alertMessage}
        })
        return false
    }

    API.patch(endpoint, item).then(() => {
        setAppState((prevState) => {
            let order = prevState.currentOrder
            order.items.forEach((element, index) => {
                if (element.id == item.id) {
                    order.items[index] = item
                }
            })

            return {...prevState, currentOrder: order, alertMessage: alertMessage}
        })
        handler()
    }).catch((error) => {
        let message = error.response.data
        return alertErrorMessage(message)
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