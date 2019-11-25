import React, {PureComponent, Fragment} from 'react';
import ShoppingCart from '../Components/ShopCatalog'
import Success from "../Components/Success";
import {
    //Router,
    Route,
    //Switch,
    // Redirect,
    withRouter
} from "react-router-dom";

class PageBasket extends PureComponent  {
    render() {
        return (
            <Fragment>
                <Route path = {`/basket`}>
                    <ShoppingCart  />
                </Route>
            </Fragment>

        );
    }

}

const withRouterPageBasket = withRouter(PageBasket);
export default withRouterPageBasket;

//export default PageBasket;

    