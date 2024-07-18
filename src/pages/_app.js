// pages/_app.js
import React from 'react';
import './index.css';
import './dashboard.css';

const App = ({ Component, pageProps }) => {
    return (
        <React.StrictMode>
            <Component {...pageProps} />
        </React.StrictMode>
    );
};

export default App;
