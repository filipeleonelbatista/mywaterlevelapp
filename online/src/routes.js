import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact element={<Home />} />
                <Route path="/Dashboard" exact element={<Dashboard />} />
                <Route path="*" element={<NotFound />}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;