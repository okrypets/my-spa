import React, {PureComponent, Fragment} from 'react';
import {
    //Router,
    Route,
    Switch,
    // Redirect,
    withRouter
} from "react-router-dom";
import PropTypes from "prop-types";
import {appEvents} from "../Components/events";
import {productsThunkAC,
    //productsThunkPOSTAC,
    //shoppingCartPOSTThunkAC
} from "../Redux/Thunk/fetchThunkProducts";
import {isProductFavoriteAC} from "../Redux/Actions/productsAC";
import {shoppingCartAddAC} from '../Redux/Actions/shoppingCartAC';
//import {shoppingCartRemoveAC} from '../Redux/Actions/shoppingCartAC';
import {connect} from "react-redux";
import loaderIconGif from '../loader.gif';
import ShopCatalog from "../Components/ShopCatalog";

import ShopCatalogItem from '../Components/ShopCatalogItem'
import Success from "../Components/Success";
//import {NO_SORT} from "../Components/Sorting";

const CATALOG_ITEM = 'CATALOG_ITEM';
const SINGLE_ITEM = 'SINGLE_ITEM';
const GREEN = 'GREEN';
const RED = 'RED';

class PageShop extends PureComponent {

    static propTypes = {
        match:PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        products: PropTypes.object, //REDUX
        currentPage:PropTypes.number,
        shoppingCart: PropTypes.object,
        //allSortedProducts: PropTypes.array,
    };

    state = {
        currentPage:1,
        products: this.props.products.data,
        shoppingCart: this.props.products.items,

    };

    componentWillMount() {
        console.log(`componentWillMount - PageShop`);
        this.props.dispatch( productsThunkAC(this.props.products));
        //this.props.dispatch( productsThunkPOSTAC(this.props.products));
        //this.props.dispatch( shoppingCartPOSTThunkAC (this.props.dispatch));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - PageShop`);

        const locationCurrentPage = +nextProps.location.pathname.replace(/[^0-9]/g, "");


        if (nextProps.match.params.urlParams !== undefined ) {
            this.setState({
                currentPage: locationCurrentPage,
            });
        }
        if (this.props.products.status === 3) {
            this.setState({
                products:this.props.products.data,
            }
            );
        }


    }

    componentDidMount() {
        console.log(`componentDidMount - PageShop`);
        //this.props.dispatch( productsThunkAC(this.props.dispatch));
        appEvents.addListener('EisFavoriteItemOnChange',this.setFavoriteItem);
        appEvents.addListener('EhandleClickBuyButton',this.addItemToShoppingCart);
        //appEvents.addListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);

    }

    componentWillUnmount() {
        console.log(`componentWillUnmount - PageShop`);
        appEvents.removeListener('EisFavoriteItemOnChange',this.setFavoriteItem);
        appEvents.removeListener('EhandleClickBuyButton',this.addItemToShoppingCart);
        //appEvents.removeListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
    };

    setFavoriteItem = (item) => {
        this.props.dispatch( isProductFavoriteAC(item));
    };

    addItemToShoppingCart = (item) => {
        console.log(`addItemToShoppingCart - PageShop`);
        const {shoppingCart} = this.props;
        let itemInCart;
        if (shoppingCart.items.length > 0) {
            itemInCart = shoppingCart.items.some(i => i.id === item.id); // товар уже есть в корзине ?

            if (!itemInCart) {
                console.log(`shoppingCart.length > 0, itemInCart - false `);
                this.props.dispatch(shoppingCartAddAC(item));
                appEvents.emit('EshowAlertCart', GREEN);
            } else {
                console.log(`shoppingCart.length > 0, itemInCart - true`);
                appEvents.emit('EshowAlertCart', RED);
            }
        } else {
            console.log(`shoppingCart.length = 0`);
            this.props.dispatch(shoppingCartAddAC(item));
            appEvents.emit('EshowAlertCart', GREEN);
        }
    };

    render() {
/*
       const {
            //currentPage,
            //products,
            //catalogLink,
            //isSortBy,
            //allSortedProducts,
            //favoriteList,
        } = this.state;
 */

        const {match, products, location} = this.props;

        if ( products.status<=1 )
            return <img src={loaderIconGif} alt={`Загрузка данных`} />;

        if ( products.status===2 )
            return "ошибка загрузки данных";

        return (
                <Fragment>
                    <Switch>
                        { location.pathname.includes('page-') ?
                            <Route path={`/${match.params.catalog}/page-:pageNumber`} render={({match}) => {
                            return (
                                <ShopCatalog currentPage={+match.params.pageNumber}
                                             products={
                                                 //location.search && isSortBy !== NO_SORT ?
                                                 //allSortedProducts
                                                 //:
                                                 products.data}
                                             showMode={CATALOG_ITEM}
                                             //isSortBy = {isSortBy}
                                />
                            )
                        }
                        } />
                        :
                            <Route path={`/${match.params.catalog}/item-:itemId`} render={({match}) => {
                                let selectedItem = products.data.filter(i => i.id === +match.params.itemId)[0];
                            return (
                                <ShopCatalogItem className={`SingleItem`}
                                                 item={selectedItem}
                                                 showMode={SINGLE_ITEM}
                                />
                            )
                        }
                        }/>
                        }
                        }
                        <Route path = {`/success`}>
                            <Success  />
                        </Route>


                    </Switch>
                </Fragment>
        );
    }
}

export {
    CATALOG_ITEM,
    SINGLE_ITEM,
    GREEN,
    RED,
}
const mapStateToProps = function (state) {
    return {
        products: state.products,
        shoppingCart: state.shoppingCart,
    };
};
const withRouterPageShop = withRouter(PageShop);
export default connect(mapStateToProps)(withRouterPageShop);


/*
const withRouterPageShop = withRouter(PageShop);
export default withRouterPageShop;

<ShopCatalog currentPage={currentPage}
                                     products={products}
                        />



 */