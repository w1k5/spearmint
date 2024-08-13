// pages/_app.js
import React from 'react';
import './index.css';
import './dashboard.css';
import Header from "../components/headers_footers/Header";
import Head from "next/head";
import Footer from "../components/headers_footers/Footer";

const App = ({ Component, pageProps }) => {
    return (
        <React.StrictMode>
            <Head>
                <meta name="description" content="Analyze your spending!"/>
                <meta name="keywords" content="React, dashboard, finance, expenses, income"/>
                <title>Spearmint Budgeting</title>
            </Head>
            <Header/>
            <Component {...pageProps} />
            <Footer />
        </React.StrictMode>
    );
};

export default App;
