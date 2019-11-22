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
import history from '../history';
import {productsThunkAC} from "../Redux/Thunk/fetchThunkProducts";
import {isProductFavoriteAC} from "../Redux/Actions/productsAC";
import {connect} from "react-redux";
import loaderIconGif from '../loader.gif';
import ShopCatalog from "../Components/ShopCatalog";

import ShopCatalogItem from '../Components/ShopCatalogItem'
//import Sorting from '../Components/Sorting'
//import {NO_SORT, BY_PRICE, BY_NAME} from "../Components/Sorting";

const CATALOG_ITEM = 'CATALOG_ITEM';
const SINGLE_ITEM = 'SINGLE_ITEM';

class PageShop extends PureComponent {

    static propTypes = {
        //router:PropTypes.object, // REDUX
        match:PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        products: PropTypes.object,
        //catalogLink: PropTypes.object,
        //isSortBy: PropTypes.number,
        currentPage:PropTypes.number,
        //favoriteList:PropTypes.array,
    };

    state = {
        currentPage:1,
        products: this.props.products.data,
        //catalogLink: ,
        //isSortBy,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - PageShop`);
        //console.log(nextProps.currentPage);
        //console.log(this.props.currentPage);
        //console.log(this.state.currentPage);

        this.unlisten = history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);

            console.log(`The last navigation action was ${action}`)
        });

        const locationCurrentPage = nextProps.location.pathname.replace(/[^0-9]/g, "");
        if (this.isPageCatalog()) {
            this.setState({
                currentPage: +locationCurrentPage,
            });
        } else {
            this.setState({
                currentPage: 1,
            });
        }
        if (this.props.products.status === 3) {
            this.setState({
                products:this.props.products.data,
                //currentPage: {this.isPageCatalog ? +currentPage : 1 },
            });
        }
        //this.setCurrentPage();
    }

    componentDidMount() {
        console.log(`componentDidMount - PageShop`);
        this.props.dispatch( productsThunkAC(this.props.dispatch) );

        appEvents.addListener('EisFavoriteItemOnChange',this.setFavoriteItem);

        //appEvents.addListener('ESortingOnChange',this.sortingOnSelectChange);

        this.unlisten = history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);

            console.log(`The last navigation action was ${action}`)
        });

        //this.getUrl();
    }

    componentWillUnmount() {
        console.log(`componentWillUnmount - PageShop`);
        appEvents.removeListener('EisFavoriteItemOnChange',this.setFavoriteItem);
        //appEvents.removeListener('onPageChangedEvent',this.dataPaginationToState);
        //appEvents.removeListener('ESortingOnChange',this.sortingOnSelectChange);
        this.unlisten();
    };

    setFavoriteItem = (item) => {
        this.props.dispatch( isProductFavoriteAC(item));
    };

    isPageCatalog = () => {
        const isPageCatalog = this.props.location.pathname.includes('page-');
        console.log(isPageCatalog);
        return isPageCatalog;
    };

    setCurrentPage =()=> {
        //console.log(isPageCatalog);
        if (this.isPageCatalog()) {
            //let regex = /\d+/g;
            //console.log(isPageCatalog.match(regex));
            //let currentPage = isPageCatalog.match(regex);

          let currentPage =this.props.location.pathname.replace(/[^0-9]/g, "");
          //  let currentPage =this.props.location.pathname.replace(/[^0-9]/g, "");
          console.log(currentPage); //
          this.setState({currentPage:+currentPage});
        } else {
            this.setState({currentPage:1});
        }
    };



    render() {
       const {
            currentPage,
            //products,
            //catalogLink,
            //isSortBy,
            //favoriteList,

        } = this.state;
        const {match, products, location} = this.props;
        console.log(match.params);



        if ( products.status<=1 )
            return <img src={loaderIconGif} alt={`Загрузка данных`} />;

        if ( products.status===2 )
            return "ошибка загрузки данных";

        return (
                <Fragment>
                    <Switch>
                        { (location.pathname.includes('page-') || !match.params.urlParams) ?

                            <Route exact path={`/${match.params.catalog}/:page?`} render={({match}) => {
                            console.log(location.pathname);
                            return (
                                <ShopCatalog currentPage={currentPage}
                                             products={products.data}
                                             showMode={CATALOG_ITEM}
                                />
                                )
                                }
                            } />
                        :
                            <Route exact path={`/${match.params.catalog}/:itemId`} render={({match}) => {
                                //console.log(products.data.filter(i => i.id === +match.params.itemId));
                                return (
                                    <ShopCatalogItem className={`SingleItem`}
                                        //itemId={+match.params.itemId}
                                                     item={products.data.filter(i => i.id === +match.params.itemId)[0]}
                                                     showMode = {SINGLE_ITEM}
                                    />
                                )
                            }
                            }/>
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