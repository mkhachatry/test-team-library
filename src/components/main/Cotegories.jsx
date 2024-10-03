import './Cotegories.css';
import React, { useState, useEffect, useRef} from 'react';
import {categories} from "../../data";
import { width } from '@fortawesome/free-regular-svg-icons/faAddressBook';

const Categories = ({ setActiveCategory }) => {

    const [show, setShow] = useState(false);
    const [nameValue, setNameValue] = useState(null);
    const [popupCtegoryType, setPopupCtegoryType] = useState('women');
    const [popupStyle, setPopupStyle] = useState({});
    const [showDefaultImage, setShowDefaultImage] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    const [activeCategoryId, setActiveCategoryId] = useState(1);
    const buttonRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const activeCategoryId = localStorage.getItem('activeCategoryId');
        if (activeCategoryId) {
            setActiveCategoryId(parseInt(activeCategoryId));
        }
    }, []);

    useEffect(() => {
        if (isFinite(Number(activeCategoryId))) {
            localStorage.setItem('activeCategoryId', activeCategoryId);
            setActiveCategory(activeCategoryId)
        }
    }, [activeCategoryId]);

    const handleAddCategory = ()=>{
        if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            setPopupStyle({
              top: `${buttonRect.top + buttonRect.height + window.scrollY + 184}px`, 
              left: `${buttonRect.left + window.scrollX - 122}px`,
            });
        }
        
        setShowDefaultImage(true);
        setShow(true);
    }

    const handleCloseAddCategory = () => {
        setShow(false);
    } 

    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result); 
            setShowDefaultImage(false);
          };
          reader.readAsDataURL(file); 
        }
      };

    const handleImageClick = () => {
        fileInputRef.current.click()
    }

    const addCategoryHandler = () => {
        if(!nameValue || !imagePreview){
            return alert("Заполните все обязательные поля");
        }
        const categoryId = Math.max(...categories.map(category => category.id)) + 1;
        categories.push(
            {
                "id": categoryId,
                "name": nameValue,
                "image": imagePreview,
                "type": popupCtegoryType,
                sub: []
            }
        );
        setShow(false)
    }

    return (
    <div className="categories">
        <div>
            <div className="icons active">
                <img src="img/icons/Vector-women.png" />
            </div>
            <div className="icons">
                <img src="img/icons/Vector-man.png" />
            </div>
        </div>
        <div className='categories-list-container'>
        <div className='categories-scroll' style={{ width: `${categories.length * 161}px` }}>
            {categories.map((item, index)=>{
                return (
                <div
                onClick={()=>{
                    setActiveCategoryId(item.id)
                }}
                 key={index} 
                 className={`categories-item ${activeCategoryId === item.id?'active':''}`}
                 >
                    <div>
                        <img src={item.image} />
                    </div>
                    <div>
                        {item.name}
                    </div>
                </div>
            );
            })}
            </div>
        </div>

        <div style={{
          zIndex: show ? 2000 : 1
        }} ref={buttonRef} className='add-cotegory' onClick={handleAddCategory}>
            <img src="img/icons/plus.png"/>
        </div>
        {show && (
            
            <div className='add-category-popup-layer'>
                <div style={popupStyle} className='add-category-popup'>
                    <div className='add-category-popup-title-bar'>
                        <span className='add-category-popup-title'>Добавить Категория</span>
                        <span onClick={handleCloseAddCategory} className='add-category-popup-close'>+</span>
                    </div>
                    <div className='add-category-popup-women-man'>
                        <div 
                            onClick={()=>{setPopupCtegoryType('women')}}
                            className={`women category-type ${popupCtegoryType=='women'?'active':''}`}
                        >
                            <span className='icon'><img src="img/icons/Vector-women.png" /></span>
                            <span className='text'>Женский</span>
                        </div>
                        <div
                            onClick={()=>{setPopupCtegoryType('man')}}
                            className={`man category-type ${popupCtegoryType=='man'?'active':''}`}
                        >
                            <span className='icon'><img src="img/icons/Vector-man.png" /></span>
                            <span className='text'>Мужской</span>
                        </div>
                    </div>
                    <div className='add-category-popup-form'>
                        <div className='name'>
                            <input 
                                value={nameValue}
                                onChange={(e)=>{setNameValue(e.target.value)}} 
                                placeholder='Категория' 
                            />
                        </div>
                        <div className='image'>
                            <input
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                            />
                            <div 
                                onClick={handleImageClick} 
                                style={!showDefaultImage?{display:'none'}:{}} 
                                className='default-preview'>

                                <div className='icon'><img src='img/icons/Group 42.png' /> </div>
                                <div className='text'>Загрузить Фото</div>
                            </div>
                            <img 
                                className='uploading-image'
                                onClick={handleImageClick} 
                                src={imagePreview}
                                style={showDefaultImage?{display:'none'}:{}}
                            />
                        </div>
                        <div onClick={addCategoryHandler} className='save-category-button'><input type="button" value="Добавить" /></div>
                    </div>
                </div>
            </div>
            
        )}
        
    </div>
    )
}

export default Categories;