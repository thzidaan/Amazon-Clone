import React from 'react'
import './styles/Header.css'

function Header() {
    return (
        <div className='header'>
            <img
            className='header__logo'  
            src='"http://pngimg.com/uploads/amazon/amazon_PNG11.png"' 
            alt =''
            />

            <div
            className='header__search'>
                <input
                className='header__searchInput'
                type='text'/>
                {/* Insert Logo Here */}


            </div>

        </div>
    )
}

export default Header
