import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
} from "react-router-dom";
import {Link} from "react-router-dom";
import Home from '../Home';
import About from '../About';
import Clients from '../Clients';
import Products from '../Products';
import Checkout from '../Checkout';
import Orders from '../Orders';
import Menu from '../../components/Menu';
import ClientChooseModal from '../../components/ClientChooseModal';


let defaultState = {
    client: null,
    currentOrder: null
}


export default function App() {
    const [state, setState] = useState(defaultState)

    return (
        <HashRouter basename={'/'}>
        <ClientChooseModal appState={state} setAppState={setState} />
        <Menu appState={state} />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/products" component={Products} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/my-orders" component={Orders} />
                </Switch>
        </HashRouter>
    );
}