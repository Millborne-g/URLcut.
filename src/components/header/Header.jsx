import React from 'react';
import './header.css';

import logo from '../../assets/logo.svg';


const Header = () => {
    return (
        <div className="header">
                <div className="header_inner">
                    <div className="logo">
                        <div>
                            <img src={logo} alt="" />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Header
