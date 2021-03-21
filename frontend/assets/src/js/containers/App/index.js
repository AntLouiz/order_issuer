import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
} from "react-router-dom";
import Home from '../Home';
import Orders from '../Orders';
import Bag from '../Bag';
import OrderDetail from '../OrderDetail';
import NotFound from '../NotFound';
import Menu from '../../components/Menu';
import Alert from '../../components/Alert';
import ClientChooseModal from '../../components/ClientChooseModal';


let defaultState = {
    client: null,
    currentOrder: {items: [], pk: null},
    alertMessage: null,
    orders: [],
    products: []
}

export default function App() {
    const [state, setState] = useState(defaultState)

    return (
        <HashRouter>
        <ClientChooseModal appState={state} setAppState={setState} />
        <Menu appState={state} />
        {state.alertMessage&& <Alert severity={state.alertMessage.severity} message={state.alertMessage.message} setAppState={setState} />}
                <Switch>
                    <Route
                        path='/'
                        exact={true}
                        render={props => <Home {...props} setAppState={setState} appState={state} name="home"/>}
                    />
                    <Route
                        path="/my-bag"
                        render={props => <Bag {...props} setAppState={setState} appState={state} name="bag"/>}
                    />
                    <Route
                        path="/orders"
                        exact={true}
                        render={props => <Orders {...props} setAppState={setState} appState={state} name='orders'/>}
                    />
                    <Route
                        path="/orders/:id"
                        exact={true}
                        component={OrderDetail}
                        name="order"
                    />
                    <Route
                        path='*'
                        component={NotFound}
                    />
                </Switch>
        </HashRouter>
    );
}