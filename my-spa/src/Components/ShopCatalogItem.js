import React from 'react';
//import {Route} from "react-router-dom";
import {Link} from "react-router-dom";
//import { push } from 'connected-react-router'
//import { bindActionCreators } from 'redux'
//import { connect } from 'react-redux'

import './ShopCatalogItem.scss';
//import SingleItem from "./SingleItem";

//import SingleItem from "./SingleItem";
//import shopData from "../shopItemArr";

//import {Events} from './events';


const ShopCatalogItem = (i) => {
console.log(i);
    let item = i.i;
    return (
        <div className="ShopCatalogItem" key={item.id}>
            <img src={`/Images/Shop/${item.ImgSrc}`} alt=""/>

            <h2>
                <Link to={`/catalog/${item.id}`} className="SingleItemName">{item.Name}</Link>
            </h2>

            <div>
                <span>{item.Price}</span>
                <input type="number" defaultValue={1}/>
                <input type="button" value="Купить"/>
            </div>
        </div>
    )
};

/*

    const mapDispatchToProps = dispatch => bindActionCreators({
       // changePage: () => push(`/SingleItem`)
    }, dispatch);

    export default connect(
        null,
        mapDispatchToProps
    )(ShopCatalogItem)
*/

/*
<button onClick={() => props.changePage()}>Go to about page via redux</button>

*/
export default ShopCatalogItem;