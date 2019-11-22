import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
//import {appEvents} from "./events";
//import { paginationStateAC } from "../Redux/Actions/paginationAC";
import Sorting from "./Sorting"
import Pagination from "./Pagination"
import ShopCatalogItem from './ShopCatalogItem';
//import {connect} from "react-redux";
//import {withRouter} from "react-router-dom";
//import SingleItem from "./SingleItem";
import FavoriteCount from '../Components/FavoriteCount'

import {
    NO_SORT,
    //BY_PRICE,
    //BY_NAME,
    //FAVORITE_ONLY
} from './Sorting';
import {
    CATALOG_ITEM,
} from '../pages/PageShop'

class ShopCatalog extends PureComponent {

    static propTypes = {
        //router:PropTypes.object, // REDUX
        //match:PropTypes.object.isRequired,
        //location: PropTypes.object.isRequired,
        //history: PropTypes.object.isRequired,
        products: PropTypes.array, // REDUX
        //catalogLink: PropTypes.object,
        isSortBy: PropTypes.number,
        currentPage:PropTypes.number.isRequired,
        //favoriteList:PropTypes.array,
        showMode: PropTypes.string,
        //pagination:PropTypes.object, // REDUX
    };


    state = {
        isSortBy: NO_SORT,
        allProducts: this.props.products,
        allSortedProducts: {},
        currentPageProducts: [],
        currentPage: this.props.currentPage,
        totalPages: null,
        //favoriteList:[],
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - ShopCatalog`);
        console.log(nextProps.currentPage);
        console.log(this.props.currentPage);
        this.setState({currentPage: nextProps.currentPage,})
        //const currentPage = this.props.currentPage;
        //this.setState({ currentPage:currentPage });
        //this.props.dispatch(paginationStateAC(this.state.currentPage, this.state.currentProducts) );
    }

    componentWillMount() {
        console.log(`componentWillMount - ShopCatalog`);
        // создаем
       //this.props.dispatch(paginationStateAC(this.state.currentPage, this.state.currentProducts) );

    }
    componentDidMount() {
        console.log(`componentDidMount - ShopCatalog`);
        //appEvents.addListener('ESortingOnChange',this.sortingOnSelectChange);
        //const allProducts = this.props.products.data;
        //this.setState({ allProducts });

        //this.props.dispatch(paginationStateAC(this.state.currentPage, this.state.currentProducts) );

    };

    componentWillUnmount() {
        console.log(`componentWillUnmount - ShopCatalog`);
        //appEvents.removeListener('ESortingOnChange',this.sortingOnSelectChange);
        //this.props.dispatch(paginationStateAC(this.state.currentPage, this.state.currentProducts) );
    };


    onPageChanged = data => {
        console.log(data);
        console.log(`onPageChanged - ShopCatalog`);
        const allProducts = this.props.products;
        //const { isSortBy } = this.state;
        //const allProducts = (isSortBy === BY_NAME) ? this.sortByName() : this.getAllProducts() ;

        const { currentPage, totalPages, pageLimit } = data;
        //const currentPage = this.state.currentPage;
        //const { totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;

        const currentPageProducts = allProducts.slice(offset, offset + pageLimit);

        //this.props.history.push(`/catalog/page-${currentPage}`);
        this.setState({ currentPage, currentPageProducts, totalPages });
        //this.props.dispatch(paginationStateAC(data.currentPage, currentProducts) );
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


        console.log(currentPage);

        return (
            <Fragment>
                <Sorting products={allProducts}/>
                <FavoriteCount products={allProducts}/>
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
                    pageLimit={5}
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
/*
const withRouterShopCatalog = withRouter(ShopCatalog);
export default withRouterShopCatalog;

 */
export default ShopCatalog;
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


