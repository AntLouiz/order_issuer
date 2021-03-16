import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
} from "react-router-dom";
import Home from '../Home';
import About from '../About';
import Products from '../Products';
import Checkout from '../Checkout';
import Orders from '../Orders';
import Bag from '../Bag';
import Menu from '../../components/Menu';
import Alert from '../../components/Alert';
import ClientChooseModal from '../../components/ClientChooseModal';


let defaultState = {
    client: null,
    currentOrder: null,
    alertMessage: null
}


export default function App() {
    const [state, setState] = useState(defaultState)

    return (
        <HashRouter basename={'/'}>
        <ClientChooseModal appState={state} setAppState={setState} />
        <Menu appState={state} />
        {state.alertMessage&& <Alert severity={state.alertMessage.severity} message={state.alertMessage.message} />}
                <Switch>
                    <Route
                        path="/home"
                        render={props => <Home {...props} setAppState={setState} name="home"/>}
                    />
                    <Route path="/about" component={About} />
                    <Route path="/products" component={Products} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/my-bag" component={Bag} />
                    <Route path="/my-orders" component={Orders} />
                </Switch>
        </HashRouter>
    );
}