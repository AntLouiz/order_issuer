import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter,
    Link
} from "react-router-dom";
import Home from '../Home';
import About from '../About';
import Clients from '../Clients';
import Products from '../Products';

export default function App() {
    return (
        <HashRouter basename={'/'}>
            <div>
                <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/clients">Clients</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
                </nav>
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/clients">
                    <Clients />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/products">
                    <Products />
                </Route>
            </Switch>
            </div>
        </HashRouter>
    );
}