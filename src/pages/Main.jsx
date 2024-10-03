import './Main.css';
import React, { useState } from 'react';
import Header from '../components/Header';
import Categories from '../components/main/Cotegories';
import ProductList from '../components/main/ProductList';

function Main() {
    const [activeCategoryId, setActiveCategoryId] = useState(null);

  return (
    <div>
        <Header />
        <Categories  setActiveCategory={setActiveCategoryId} />
        <ProductList activeCategoryId={activeCategoryId} />
    </div>
  );
}

export default Main;
