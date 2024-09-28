import './Main.css';
import React from 'react';
import Header from '../components/Header';
import Categories from '../components/main/Cotegories';
import ProductList from '../components/main/ProductList';

function Main() {
  return (
    <div>
        <Header />
        <Categories />
        <ProductList />
    </div>
  );
}

export default Main;
