import React from 'react';
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
import Menu from '../../components/Menu';



export default function App() {
    return (
        <HashRouter basename={'/'}>
        <Menu />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/products" component={Products} />
                    <Route path="/checkout" component={Checkout} />
                </Switch>
        </HashRouter>
    );
}