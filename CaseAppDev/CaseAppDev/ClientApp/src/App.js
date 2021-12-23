import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchClientes } from "./components/FetchClientes"
import { AddClientes } from "./components/AddClientes"
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={FetchClientes} />
                <Route path='/fetch-clientes' component={FetchClientes} />
                <Route path='/add-clientes' component={AddClientes} />
                <Route path='/clientes/edit/:id' component={AddClientes} />
            </Layout>
        );
    }
}
