// App.js
import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/spearmint/" element={<Home />} />
            </Routes>
        </HashRouter>
    );
};

export default App;