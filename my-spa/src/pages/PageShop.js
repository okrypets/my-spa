import React, {PureComponent, Fragment} from 'react';
import {
    Route,
    Switch,
    withRouter
} from "react-router-dom";
import PropTypes from "prop-types";
import {appEvents} from "../Components/events";
import {productsThunkAC,
} from "../Redux/Thunk/fetchThunkProducts";
import {shoppingCartThunkAC,
    shoppingCartAddThunkAC,
} from '../Redux/Thunk/fetchThunkCart'
import {isProductFavoriteAC} from "../Redux/Actions/productsAC";
import {shoppingCartAddAC} from '../Redux/Actions/shoppingCartAC';
import {connect} from "react-redux";
import loaderIconGif from '../loader.gif';
import ShopCatalog from "../Components/ShopCatalog";

import ShopCatalogItem from '../Components/ShopCatalogItem'
import Success from "../Components/Success";

const CATALOG_ITEM = 'CATALOG_ITEM';
const SINGLE_ITEM = 'SINGLE_ITEM';
const GREEN = 'GREEN';
const RED = 'RED';

export class PageShop extends PureComponent {

    static propTypes = {
        match:PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        products: PropTypes.object, //REDUX
        currentPage:PropTypes.number,
        shoppingCart: PropTypes.object, //REDUX
    };

    state = {
        currentPage:1,
        products: this.props.products.data,
        shoppingCart: null,
    };

    UNSAFE_componentWillMount() {
        this.props.dispatch( productsThunkAC(this.props.dispatch));
        this.props.dispatch( shoppingCartThunkAC(this.props.dispatch));
    }

    componentDidUpdate(prevProps, prevState, Snapshot) {
        const locationCurrentPage = +this.props.location.pathname.replace(/[^0-9]/g, "");

        if (this.props.match.params.urlParams !== undefined ) {
            this.setState({
                currentPage: locationCurrentPage,
            });
        }
            this.setState({
                products:this.props.products.data,
                }
            );

        this.setState({
            shoppingCart:this.props.shoppingCart.items,
        })

    }

    componentDidMount() {
        appEvents.addListener('EisFavoriteItemOnChange',this.setFavoriteItem);
        appEvents.addListener('EhandleClickAddToCart',this.addItemToShoppingCart);

    }

    componentWillUnmount() {
        appEvents.removeListener('EisFavoriteItemOnChange',this.setFavoriteItem);
        appEvents.removeListener('EhandleClickAddToCart',this.addItemToShoppingCart);
    };

    setFavoriteItem = (item) => {
        this.props.dispatch( isProductFavoriteAC(item));

    };

    addItemToShoppingCart = (item) => {
        const {shoppingCart} = this.state;
        let itemInCart;
        if (shoppingCart.length > 0) {
            itemInCart = shoppingCart.some(i => i.id === item.id);
            if (!itemInCart) {
                this.props.dispatch(shoppingCartAddAC(item)); //отправляем просто в REDUX
                this.props.dispatch(shoppingCartAddThunkAC(item));//отправляем в AJAX
                appEvents.emit('EshowAlertCart', GREEN);
            } else {
                appEvents.emit('EshowAlertCart', RED);
            }
        } else {
            this.props.dispatch(shoppingCartAddAC(item));//отправляем просто в REDUX
            this.props.dispatch(shoppingCartAddThunkAC(item));//отправляем в AJAX
            appEvents.emit('EshowAlertCart', GREEN);
        }
    };



    render() {
        console.log(`PageShop - RENDER`);
        const {match, products, location} = this.props;
        if (products.status<=1) {return  <img src={loaderIconGif} alt={`Загрузка данных`} />}
        if (products.status===2) {return <p>Ошибка загрузки данных</p>}
        return (
                <div className={`PageShop`}>
                    <Switch>
                        { location.pathname.includes('page-') ?
                            <Route path={`/${match.params.catalog}/page-:pageNumber`} render={({match}) => {
                            return (
                                <Fragment>
                                    {products.data &&
                                        <ShopCatalog currentPage={+match.params.pageNumber}
                                                products={products.data}
                                                showMode={CATALOG_ITEM}
                                        />
                                    }
                                </Fragment>
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
                </div>
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