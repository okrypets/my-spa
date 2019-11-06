import React, {Fragment} from 'react';
//import PropTypes from 'prop-types';
//import {Switch, Route} from "react-router-dom";
import shopData from '../shopItemArr';

import ShopCatalogItem from './ShopCatalogItem';
//import {Link} from "react-router-dom";
//import SingleItem from "./SingleItem";
let itemsArr = shopData.shopItemArr;

const ShopCatalog = ({match}) => {
    console.log({match});
    return (
        <Fragment>
            {itemsArr && (
                itemsArr.map((i) => {
                        console.log(i);
                        return (<ShopCatalogItem key={i.id} i={i}/>)
                }

                )
            )
            }
        </Fragment>
    )
};
export default ShopCatalog;