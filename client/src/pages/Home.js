import React from 'react';
import Header from '../components/Header';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location=useLocation()
  
  
  return (
    <div>
     <Header userDetails={location.state} />
     <Products/>
     <Footer/>
    </div>
  );
};

export default Home;