import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {appEvents} from "./events";
//import { paginationStateAC } from "../Redux/Actions/paginationAC";
import Sorting, {BY_NAME, BY_PRICE, NO_SORT} from "./Sorting"
import Pagination from "./Pagination"
import ShopCatalogItem from './ShopCatalogItem';
//import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
//import SingleItem from "./SingleItem";
import FavoriteCount from '../Components/FavoriteCount'

import {
    CATALOG_ITEM,
} from '../pages/PageShop'
//import {appEvents} from "./events";

class ShopCatalog extends PureComponent {

    static propTypes = {
        //router:PropTypes.object, // REDUX
        //match:PropTypes.object.isRequired,
        location: PropTypes.object,
        history: PropTypes.object.isRequired,
        products: PropTypes.array, // REDUX
        //catalogLink: PropTypes.object,
        isSortBy: PropTypes.string,
        currentPage:PropTypes.number,
        //favoriteList:PropTypes.array,
        showMode: PropTypes.string,
        //pagination:PropTypes.object, // REDUX
        allSortedProducts: PropTypes.array,
    };


    state = {
        isSortBy: this.props.isSortBy,
        allProducts: this.props.products,
        allSortedProducts: [],
        currentPageProducts: [],
        currentPage: this.props.currentPage,
        totalPages: null,
        //favoriteList:[],
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - ShopCatalog`);
        //console.log(nextProps.currentPage);
        //console.log(this.props.currentPage);


        this.setState({
            currentPage: nextProps.currentPage,
        }, () => appEvents.emit('EcurrentPageToHandleClick',this.state.currentPage))


        console.log(nextProps.location.search);
        const pageCatalogSortedBy = nextProps.location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        console.log(pageCatalogSortedBy);
        this.setState({isSortBy:pageCatalogSortedBy}, this.getSortedProductsArray);
        //appEvents.addListener('EgetSortedProductsArray',this.setSortedProductsArray); //передается отсоритированный массив товаров

        //const currentPage = this.props.currentPage;
        //this.setState({ currentPage:currentPage });
        //this.props.dispatch(paginationStateAC(this.state.currentPage, this.state.currentProducts) );
    }

    componentWillMount() {
        console.log(`componentWillMount - ShopCatalog`);
        //appEvents.addListener('EgetSortedProductsArray',this.setSortedProductsArray); //передается отсоритированный массив товаров
        // создаем
       //this.props.dispatch(paginationStateAC(this.state.currentPage, this.state.currentProducts) );
        console.log(this.props.location.search);
        const pageCatalogSortedBy = this.props.location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        console.log(pageCatalogSortedBy);
        this.setState({isSortBy:pageCatalogSortedBy}, this.getSortedProductsArray);

    }
    componentDidMount() {
        console.log(`componentDidMount - ShopCatalog`);
        //appEvents.addListener('ESortingOnChange',this.sortingOnSelectChange); // Передается BY_NAME или др.
        //appEvents.addListener('EgetSortedProductsArray',this.setSortedProductsArray); //передается отсоритированный массив товаров
        //const allProducts = this.props.products.data;
        //this.setState({ allProducts });

        //this.props.dispatch(paginationStateAC(this.state.currentPage, this.state.currentProducts) );


    };

    componentWillUnmount() {
        console.log(`componentWillUnmount - ShopCatalog`);
        //appEvents.removeListener('ESortingOnChange',this.sortingOnSelectChange);
        //this.props.dispatch(paginationStateAC(this.state.currentPage, this.state.currentProducts) );
    };

    setSortedProductsArray = (sortedArray)=> {
        console.log(`getSortedProductsArray`);
        console.log(sortedArray);
        this.setState({
            allSortedProducts: sortedArray,
        })
    }


    onPageChanged = data => {
        console.log(data);
        console.log(`onPageChanged - ShopCatalog`);
        const allProducts = this.props.products;
        const { allSortedProducts, isSortBy } = this.state;
        //const allProducts = (isSortBy !== NO_SORT) ? this.sortByName() : this.getAllProducts() ;

        const { currentPage, totalPages, pageLimit } = data;
        //const currentPage = this.state.currentPage;
        //const { totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;

        const currentPageProducts = (isSortBy !== NO_SORT ? allSortedProducts : allProducts).slice(offset, offset + pageLimit);

        //this.props.history.push(`/catalog/page-${currentPage}`);
        this.setState({ currentPage, currentPageProducts, totalPages });
        //this.props.dispatch(paginationStateAC(data.currentPage, currentProducts) );
    };


    getSortedProductsByName = () => {
        console.log(`getSortedProductsByName`);
        const {products} = this.props;
        console.log(products.data);
        let newProducts = products.slice();
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
        let newProducts = products.slice();
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
        console.log("ShopCatalog - render");

        //console.log(this.props.products);
        //let productsArr = this.props.products.data;

        const {
            allProducts,
            currentPageProducts,
            currentPage,
            totalPages
        } = this.state;
        const totalProducts = allProducts.length;
        if (totalProducts === 0) return null;

        //let pageLink = `page-${currentPage}`;


        //console.log(currentPage);

        return (
            <Fragment>
                <div className={`sortingBlock`}>
                    <Sorting products={allProducts}/>
                    <FavoriteCount products={allProducts}/>
                </div>

                {
                        //currentProducts.map((item) => <ShopCatalogItem key={item.id} item={item} />)
                    currentPageProducts.map((item) => <ShopCatalogItem className={`CatalogItem`}
                                                               key={item.id}
                                                               item={item}
                                                               showMode = {CATALOG_ITEM}
                    />)
                }

                <Pagination
                    totalRecords={totalProducts}
                    pageLimit={50}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                    currentPage={currentPage}
                />
                {currentPage && (
                    <div >
                  Page <span className="current-page">{currentPage}</span> /{" "}
                        <span className="total-page">{totalPages}</span>
                </div>
                )}

            </Fragment>
        )
    }

}
/*
const mapStateToProps = function (store) {
    return {
        //router:state.router.location,
        products: store.products,
        //pagination: state.pagination.pagination,
    };
};
const withRouterShopCatalog = withRouter(ShopCatalog);
export default connect(mapStateToProps)(withRouterShopCatalog);
 */

const withRouterShopCatalog = withRouter(ShopCatalog);
export default withRouterShopCatalog;

//export default ShopCatalog;
/*
<Route exact path={(totalPages>1 && currentPage!==1)?`/${this.props.catalogLink.catalog}/:page-${this.state.currentPage}`:`/${this.props.catalogLink.catalog}`}>


<Switch>
                        <Route path={`/${this.props.match.match.params.catalog}/:page-${currentPage}?`}>
{
    currentProducts.map((item) => <ShopCatalogItem key={item.id} item={item} />)
}
</Route>
</Switch>*/

/*
{
                            currentProducts.map((item) => <ShopCatalogItem key={item.id} item={item} />)
                        }
*/

/*
render = {({match}) => {
                               console.log({match});
                        return (

                            (totalPages === null ? allProducts : currentProducts).map((item) => <ShopCatalogItem key={item.id} item={item} />)

                        )

                    }
                           }
 */


