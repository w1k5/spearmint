// pages/_app.js
import React from 'react';
import './index.css';
import './dashboard.css';
import Header from "../components/header/Header";
import Head from "next/head";
import Footer from "../components/footer/Footer";

const App = ({ Component, pageProps }) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/spearmint' : '';

    return (
        <React.StrictMode>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`}/>
                <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32x32.png`}/>
                <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/favicon-16x16.png`}/>
                <link rel="manifest" href={`${basePath}/site.webmanifest`}/>
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
