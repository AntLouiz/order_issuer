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
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/clients">
                        <Clients />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/products">
                        <Products />
                    </Route>
                    <Route path="/checkout" component={Checkout} />
                </Switch>
        </HashRouter>
    );
}