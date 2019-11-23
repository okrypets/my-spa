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
import {productsThunkAC} from "../Redux/Thunk/fetchThunkProducts";
import {isProductFavoriteAC} from "../Redux/Actions/productsAC";
import {connect} from "react-redux";
import loaderIconGif from '../loader.gif';
import ShopCatalog from "../Components/ShopCatalog";

import ShopCatalogItem from '../Components/ShopCatalogItem'
import {NO_SORT, BY_PRICE, BY_NAME} from "../Components/Sorting";

const CATALOG_ITEM = 'CATALOG_ITEM';
const SINGLE_ITEM = 'SINGLE_ITEM';

class PageShop extends PureComponent {

    static propTypes = {
        match:PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        products: PropTypes.object, //REDUX
        currentPage:PropTypes.number,
        allSortedProducts: PropTypes.array,
    };

    state = {
        currentPage:1,
        products: this.props.products.data,
        allSortedProducts: [],
        //catalogLink: ,
        isSortBy: NO_SORT,
    };

    componentWillMount() {
        console.log(`componentWillMount - PageShop`);

        if (this.props.products.status === 3) {
            this.setState({
                products:this.props.products.data,
            });
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - PageShop`);

        const locationCurrentPage = +nextProps.location.pathname.replace(/[^0-9]/g, "");


        console.log(nextProps.location.search);
        const pageCatalogSortedBy = nextProps.location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        console.log(pageCatalogSortedBy);
        this.setState({isSortBy:pageCatalogSortedBy});


        if (nextProps.match.params.urlParams !== undefined ) {
            this.setState({
                currentPage: locationCurrentPage,
            });
        }
        if (this.props.products.status === 3) {
            this.setState({
                products:this.props.products.data,
            }, this.getSortedProductsArray);
        }
        console.log(this.props.actions);

    }

    componentDidMount() {
        console.log(`componentDidMount - PageShop`);
        this.props.dispatch( productsThunkAC(this.props.dispatch));
        appEvents.addListener('EisFavoriteItemOnChange',this.setFavoriteItem);

    }

    componentWillUnmount() {
        console.log(`componentWillUnmount - PageShop`);
        appEvents.removeListener('EisFavoriteItemOnChange',this.setFavoriteItem);
    };

    setFavoriteItem = (item) => {
        this.props.dispatch( isProductFavoriteAC(item));
    };


    setSortedProductsArray = (sortedArray) => {
        console.log(`getSortedProductsArray`);
        console.log(sortedArray);
        this.setState({
            allSortedProducts: sortedArray,
           //isSortBy: event.target.value,
        })
    };


    getSortedProductsByName = () => {
        console.log(`getSortedProductsByName`);
        const {products} = this.props;
        console.log(products.data);
        let newProducts = products.data.slice();
        let sortedByName;
        sortedByName = newProducts.sort((a, b) => {
            let nameA=a.Name.toLowerCase(),
                nameB=b.Name.toLowerCase();
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });
        this.setState({
            allSortedProducts: sortedByName,
        });
    };

    getSortedProductsByPrice = () => {
        const {products} = this.props;
        console.log(products.data);
        let newProducts = products.data.slice();
        let sortedByPrice;
        sortedByPrice = newProducts.sort((a, b) => {
            return a.Price-b.Price;
        });
        this.setState({
            allSortedProducts: sortedByPrice,
        });
    };

    getSortedProductsArray =() => {
        console.log(`getSortedProductsArray`);
        const {isSortBy} = this.state;
        //let sortedBy;
        if (isSortBy === BY_NAME) {
            this.getSortedProductsByName();
        } else if (isSortBy === BY_PRICE) {
            this.getSortedProductsByPrice();
        } else {
            this.setState({
                allSortedProducts: [],
                isSortBy:NO_SORT,
            })
        }

    };


    render() {

       const {
            //currentPage,
            //products,
            //catalogLink,
            isSortBy,
            allSortedProducts,
            //favoriteList,
        } = this.state;


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
                                             products={location.search && isSortBy !== NO_SORT ?
                                                 allSortedProducts
                                                 :
                                                 products.data}
                                             showMode={CATALOG_ITEM}
                                             isSortBy = {isSortBy}
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



                    </Switch>
                </Fragment>
        );
    }
}

export {
    CATALOG_ITEM,
    SINGLE_ITEM,
}
const mapStateToProps = function (state) {
    return {
        products: state.products,
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