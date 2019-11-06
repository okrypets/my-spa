import React, {Fragment} from 'react';
import ShopCatalog from '../Components/ShopCatalog';
import SingleItem from "../Components/SingleItem";
import shopData from '../shopItemArr';
import {Route} from "react-router-dom";
let itemsArr = shopData.shopItemArr;

const PageCatalog = () => (
    <Route path="/:catalog" className="PageCatalog" render = {({match}) => {

        return (
            <Fragment>

                <Route exact path={`/${match.params.catalog}`}  component = {ShopCatalog}/>

                {itemsArr &&
                <Route path={`/${match.params.catalog}/:itemId`} render={({match}) => {
                    return <SingleItem className="SingleItem" itemId = {match.params.itemId}/>
                    }
                }/>
                }
            </Fragment>
        )
    }} />
);
export default PageCatalog;

