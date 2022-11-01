import React from 'react';
import About from './About/About';
import Banner from './banner/Banner';
import Services from './services/Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Services></Services>
        </div>
    );
};

export default Home;