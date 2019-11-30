import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {appEvents} from "./events";
import Sorting, {BY_NAME, BY_PRICE, NO_SORT} from "./SortingSelect"
import Pagination from "./Pagination"
import ShopCatalogItem from './ShopCatalogItem';
import {withRouter} from "react-router-dom";
import FavoriteCount from '../Components/FavoriteCount'
import {
    CATALOG_ITEM,
} from '../pages/PageShop'

export class ShopCatalog extends PureComponent {

    static propTypes = {
        location: PropTypes.object,
        history: PropTypes.object,
        products: PropTypes.array,
        //isSortBy: PropTypes.string,
        currentPage:PropTypes.number,
        showMode: PropTypes.string,
        allSortedProducts: PropTypes.array,
    };


    state = {
        isSortBy: NO_SORT,
        allProducts: this.props.products,
        allSortedProducts: [],
        colorFavorite:false,
        currentPageProducts: [],
        currentPage: this.props.currentPage,
        totalPages: null,
        onPageChangedData:{}
    };

    //componentWillReceiveProps(nextProps, nextContext) {
    componentDidUpdate(prevProps, prevState, Snapshot) {
        console.log(`componentDidUpdate`);
        console.log(this.props.products[0])
        console.log(prevProps.products[0])
        console.log(this.state.isSortBy)
        console.log(prevState.isSortBy)
        if (this.props.products !== prevProps.products) {
            this.setState({
                allProducts:this.props.products,
            })
        }
    }

    UNSAFE_componentWillMount() {
        console.log(`componentWillMount`);
        const pageCatalogSortedBy = this.props.location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        this.setState({isSortBy:pageCatalogSortedBy}, () => this.getSortedProductsArray(this.state.isSortBy));

    }
    componentDidMount() {
        console.log(`componentDidMount`);
        appEvents.addListener('EcolorAllFavoriteByClick',this.colorAllFavoriteProducts);
        appEvents.addListener('EonHandleChangeSelectSorting',this.getSortedProductsArray);
    };

    componentWillUnmount() {
        appEvents.removeListener('EcolorAllFavoriteByClick',this.colorAllFavoriteProducts);
        appEvents.removeListener('EonHandleChangeSelectSorting',this.getSortedProductsArray);
    };


    colorAllFavoriteProducts = () => {
        console.log(`colorAllFavoriteProducts`)
        const {colorFavorite} = this.state;
        this.setState({
            colorFavorite: !colorFavorite,
        });
        this.currentPageToHandleClick();
        //this.onPageChanged(this.state.onPageChangedData)
    }

    currentPageToHandleClick =() => {
        appEvents.emit('EcurrentPageToHandleClick', this.state.currentPage)
    }


    onPageChanged = data => {
        console.log(`onPageChanged`)
        this.setState({
            onPageChangedData:data,
        })
        //console.log(data);
        //const allProducts = this.props.products;
        const { allSortedProducts, isSortBy, allProducts} = this.state;

        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        console.log(isSortBy)
        console.log(isSortBy !== NO_SORT )
        console.log(allProducts)
        const currentPageProducts = (isSortBy !== NO_SORT ? allSortedProducts : allProducts).slice(offset, offset + pageLimit);
        //const currentPageProducts = allProducts.slice(offset, offset + pageLimit);

        console.log(currentPageProducts);
        this.setState({ currentPage, currentPageProducts, totalPages });
    };


    getSortedProductsByName = () => {
        console.log(`getSortedProductsByName`)
        const {products} = this.props;
        let newProducts = products.slice();
        let sortedByName;
        sortedByName = newProducts.sort((a, b) => {
            let nameA=a.Name.toLowerCase(),
                nameB=b.Name.toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });
        //console.log(sortedByName)
        this.setState({
            allSortedProducts: sortedByName,
        });

    };

    getSortedProductsByPrice = () => {
        console.log(`getSortedProductsByPrice`)
        const {products} = this.props;
        let newProducts = products.slice();
        let sortedByPrice;
        sortedByPrice = newProducts.sort((a, b) => {
            return a.Price-b.Price;
        });
        this.setState({
            allSortedProducts: sortedByPrice,
        }, () => this.onPageChanged);

    };

    getSortedProductsArray =(sortingSelected) => {
        console.log(`getSortedProductsArray`)
        //const {isSortBy} = this.state;
        this.setState({
            isSortBy:sortingSelected,
        });
        if (sortingSelected === BY_NAME) {
            console.log(`isSortBy === 'BY_NAME'`);
            this.getSortedProductsByName();
        } else if (sortingSelected === BY_PRICE) {
            console.log(`isSortBy === 'BY_PRICE'`);
            this.getSortedProductsByPrice();
        } else {
            console.log(`isSortBy === NO_SORT`);
            this.setState({
                allSortedProducts: [],
                isSortBy:NO_SORT,
            })
        }
        this.currentPageToHandleClick();

        //this.onPageChanged(this.state.onPageChangedData)
    };

    render() {
        console.log("ShopCatalog - RENDER");
        const {
            allProducts,
            currentPageProducts,
            currentPage,
            totalPages,
            colorFavorite,
        } = this.state;
        const totalProducts = allProducts.length;
        if (totalProducts === 0) return null;

        return (
            <div className={`ShopCatalog`}>
                <div className={`sortingBlock`}>
                    <Sorting products={allProducts}/>
                    <FavoriteCount products={allProducts} />
                </div>

                {
                    currentPageProducts.map((item) => {
                            //console.log(`${item.id} - ${item.IS_FAVORITE}`);
                            //console.log(colorFavorite);
                            return <ShopCatalogItem className={`CatalogItem`}
                                                    key={item.id}
                                                    item={item}
                                                    showMode={CATALOG_ITEM}
                                                    colorFavorite={item.IS_FAVORITE && colorFavorite ? 'colored' : ''}
                            />
                        }
                        )


                }

                        <Pagination
                            totalRecords={totalProducts}
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
            </div>
        )
    }

}
const withRouterShopCatalog = withRouter(ShopCatalog);
export default withRouterShopCatalog;