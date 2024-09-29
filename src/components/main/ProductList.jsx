import './Cotegories';
import React, { useState, useEffect } from 'react';
import {productType, productList, categories} from '../../data';
import './ProductList.css';


const ProductList = () => {
    const [activeTypeId, setActiveTypeId] = useState(1);
    
    return (
      <div className='product-list'>
        <div className='product-type'>
            <div className='product-row'>
                <ul>
                    {productType.map((item) => {
                        let className = (item.id === activeTypeId?'active':'');
                        return (<li className={className}>{item.name}</li>)
                    })}
                </ul>
            </div>
        </div>
        <div className='product-list-content'>
            <div className='product-row'>
                {productList.map((item)=>{
                    return (
                        <div className='product-item'>
                            <div><img src={item.image} alt="" /></div>
                            <div className='product-deteils'>
                                <div>{item.artikul}</div>
                                <div>$          {item.price}</div>
                            </div>
                        </div>
                    );
                })}
            </div>    
        </div>    
      </div>
    )
  }
  
  export default ProductList;