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
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon_io/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon_io/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon_io/favicon-32x32.png"/>
                <link rel="manifest" href="/assets/favicon_io/site.webmanifest"/>
                <meta name="description" content="Analyze your spending!"/>
                <meta name="keywords" content="React, dashboard, finance, expenses, income"/>
                <title>Spearmint Budgeting</title>
            </Head>
            <Header/>
            <Component {...pageProps} />
            <Footer/>
        </React.StrictMode>
    );
};

export default App;
