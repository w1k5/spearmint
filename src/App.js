// App.js
import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import {parseData} from "./utils/parsers";

const App = () => {
    const [data, setData] = useState([]);

    const handleFileUploaded = (fileData) => {
        const parsedData = parseData(fileData);
        setData(parsedData);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;