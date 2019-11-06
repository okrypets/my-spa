import React from 'react';
import shopData from "../shopItemArr";
//import PropTypes from 'prop-types';
//import { Route } from "react-router-dom";
//import {Events} from './events';
//import shopData from '../shopItemArr';
let itemsArr = shopData.shopItemArr;

const SingleItem = (itemId) => {
    //console.log(itemId);
    //console.log(itemsArr);
    let item = itemsArr.find( c => c.id === +itemId.itemId );
    //console.log(item);
    return (
        <div className="SingleItem">
            <img src={`/Images/Shop/${item.ImgSrc}`} alt=""/>
            <h2>
                {item.Name}
            </h2>
            <div>
                <span>{item.Price}</span>
                <input type="number" defaultValue={1}/>
                <input type="button" value="Купить"/>
            </div>
            <div>
                <span>{item.excerpt}</span>
            </div>
        </div>
    )
};

export default SingleItem;
