import './Header.css';
import { NavLink as Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <div className='search-bar'>
        <input placeholder='Search' className='search' /> 
        <span className='search-button'><i className="fas fa-search"></i></span>
      </div>
    </div>
    
  )
}

export default Header;