import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {appEvents} from "./events";
import SortingSelect, {BY_NAME, BY_PRICE, NO_SORT} from "./SortingSelect"
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

    componentDidUpdate(prevProps, prevState, Snapshot) {
        if (this.props.products !== prevProps.products) {
            this.setState({
                allProducts:this.props.products,
            })
        }
        if (this.props.location.search !== prevProps.location.search) {
            const pageCatalogSortedBy = this.props.location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
            this.setState({isSortBy:pageCatalogSortedBy}, () => this.getSortedProductsArray(this.state.isSortBy));
        }

        const locationCurrentPage = +this.props.location.pathname.replace(/[^0-9]/g, "");
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({
                currentPage: locationCurrentPage,
            });
        }
    }

    UNSAFE_componentWillMount() {
        const pageCatalogSortedBy = this.props.location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        this.setState({isSortBy:pageCatalogSortedBy}, () => this.getSortedProductsArray(this.state.isSortBy));

    }
    componentDidMount() {
        appEvents.addListener('EcolorAllFavoriteByClick',this.colorAllFavoriteProducts);
        appEvents.addListener('EonHandleChangeSelectSorting',this.getSortedProductsArray);
    };

    componentWillUnmount() {
        appEvents.removeListener('EcolorAllFavoriteByClick',this.colorAllFavoriteProducts);
        appEvents.removeListener('EonHandleChangeSelectSorting',this.getSortedProductsArray);
    };


    colorAllFavoriteProducts = () => {
        const {colorFavorite} = this.state;
        this.setState({
            colorFavorite: !colorFavorite,
        });
        this.currentPageToHandleClick();
    }

    currentPageToHandleClick =() => {
        appEvents.emit('EcurrentPageToHandleClick', this.state.currentPage)
    }


    onPageChanged = data => {
        this.setState({
            onPageChangedData:data,
        })
        const { allSortedProducts, isSortBy, allProducts} = this.state;

        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentPageProducts = (isSortBy !== NO_SORT ? allSortedProducts : allProducts).slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentPageProducts, totalPages });
    };


    getSortedProductsByName = () => {
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
        this.setState({
            allSortedProducts: sortedByName,
        });

    };

    getSortedProductsByPrice = () => {
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
        this.setState({
            isSortBy:sortingSelected,
        });
        if (sortingSelected === BY_NAME) {
            this.getSortedProductsByName();
        } else if (sortingSelected === BY_PRICE) {
            this.getSortedProductsByPrice();
        } else {
            this.setState({
                allSortedProducts: [],
                isSortBy:NO_SORT,
            })
        }
        this.currentPageToHandleClick();

    };

    render() {
        const {inShoppingCart} = this.props;
        const {
            allProducts,
            currentPageProducts,
            currentPage,
            colorFavorite,
        } = this.state;
        const totalProducts = allProducts.length;
        if (totalProducts === 0) return null;

        return (
            <div className={`ShopCatalog`}>
                <div className={`sortingBlock`}>
                    <SortingSelect products={allProducts}/>
                    <FavoriteCount products={allProducts} />
                </div>

                {
                    currentPageProducts.map((item) => {
                            return <ShopCatalogItem className={`CatalogItem`}
                                                    key={item.id}
                                                    item={item}
                                                    showMode={CATALOG_ITEM}
                                                    colorFavorite={colorFavorite}
                                                    inShoppingCart = {inShoppingCart}
                            />
                        }
                        )


                }

                    <Pagination
                        totalRecords={totalProducts}
                        pageNeighbours={1}
                        cbOnPageChanged={this.onPageChanged}
                        currentPage={currentPage}
                    />


            </div>
        )
    }

}
const withRouterShopCatalog = withRouter(ShopCatalog);
export default withRouterShopCatalog;