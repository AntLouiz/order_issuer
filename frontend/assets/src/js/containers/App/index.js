import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
} from "react-router-dom";
import Home from '../Home';
import About from '../About';
import Clients from '../Clients';
import Products from '../Products';
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
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/products">
                    <Products />
                </Route>
            </Switch>
    </HashRouter>
    );
}