import './Cotegories';
import React, { useState, useEffect, useRef } from 'react';
import { productList, categories} from '../../data';
import './ProductList.css';


const ProductList = ({ activeCategoryId }) => {
    const [activeSubId, setActiveSubId] = useState(1);
    const [showSubcategoryPopup, setShowSubcategoryPopup] = useState(false);
    const [popupStyle, setPopupStyle] = useState({});
    const [activeCategoryName, setActiveCategoryName] = useState(null);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [newSubName, setNewSubName] = useState(null);

    const buttonRef = useRef(null);

    const updateCategoryData = () => {
        const category = categories.find(item => item.id === activeCategoryId);
        if (category) {
            setActiveCategoryName(category.name);
            setSubCategoryList(category.sub)
        }
    }

    useEffect(() => {
        updateCategoryData();
    }, [activeCategoryId]);


    const openAddSubCategoryPopup = ()=>{
        if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            setPopupStyle({
              top: `${buttonRect.top + buttonRect.height + window.scrollY + 114}px`, 
              left: `${buttonRect.left + window.scrollX - 146}px`,
            });
        }
        setShowSubcategoryPopup(true);
    }

    const handleCloseAddSubCategory = () => {
        setShowSubcategoryPopup(false);
    } 

    const saveSubCategoryHandler = () => {
        let subId = 1;
        if(subCategoryList.length > 0){
            subId = Math.max(...subCategoryList.map(sub => sub.id)) + 1;
        }
        
        const subName = newSubName;
        if(!subName){
            alert("Заполните все обязательные поля");
            return;
        }
        const aci = categories.findIndex(item => item.id === activeCategoryId);
        categories[aci].sub.push(
            {
                id: subId,
                name: subName
            }
        );
        handleCloseAddSubCategory();
    }

    return (
      <div className='product-list'>
        <div className='product-type'>
            <div className='product-row'>
                <ul>
                    {subCategoryList.map((item) => {
                        let className = (item.id === activeSubId?'active':'');
                        return (<li className={className}>{item.name}</li>)
                    })}
                </ul>
                <div 
                ref={buttonRef}
                onClick={openAddSubCategoryPopup} 
                className='add-sub-category-button'
                style={{zIndex:showSubcategoryPopup?801:1}}
                >+</div>
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
        {showSubcategoryPopup && (<>
        <div className='add-sup-category-popup'>
            <div style={popupStyle} className='add-sub-category-popup'>
                <div className='add-category-popup-title-bar'>
                    <span className='add-category-popup-title'>{activeCategoryName} : Добавить подкатегория</span>
                    <span onClick={handleCloseAddSubCategory} className='add-category-popup-close'>+</span>
                </div>
                <div>
                    <input
                        onChange={(e)=>{setNewSubName(e.target.value)}}
                        className='add-sub-category-popup-name' 
                        placeholder='Подкатегория'
                    />
                </div>
                <div className='save-category-button'>
                    <input onClick={saveSubCategoryHandler} type='button' value='Добавить'/>
                </div>
            </div>
        </div>
        </>)}   
      </div>
    )
  }
  
  export default ProductList;