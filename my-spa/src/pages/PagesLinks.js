import React from 'react';
//import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import './PagesLinks.css';

export default function PagesLinks() {
    return (
      <div className="PagesLinks">
        <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Главная</NavLink>
        <NavLink to="/catalog" className="PageLink" activeClassName="ActivePageLink">Каталог</NavLink>
        <NavLink to="/basket" className="PageLink" activeClassName="ActivePageLink">Корзина</NavLink>
      </div>
    );    
}


    