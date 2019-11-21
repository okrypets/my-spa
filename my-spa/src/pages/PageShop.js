

import React, {PureComponent} from 'react';
import {
    //Router,
    Route,
    //Switch,
    // Redirect,
    withRouter
} from "react-router-dom";
//import {appEvents} from "../Components/events";
import history from '../history';
import {productsThunkAC} from "../Redux/Thunk/fetchThunkProducts";
import {connect} from "react-redux";
import loaderIcon from '../loader.gif';
import ShopCatalog from "../Components/ShopCatalog";
import PropTypes from "prop-types";
//import Sorting from '../Components/Sorting'
//import {NO_SORT, BY_PRICE, BY_NAME} from "../Components/Sorting";

class PageShop extends PureComponent {

    static propTypes = {
        //router:PropTypes.object, // REDUX
        match:PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        products: PropTypes.object,
        catalogLink: PropTypes.object,
        //isSortBy: PropTypes.number,
        currentPage:PropTypes.number,
        favoriteList:PropTypes.array,
    };

    state = {
        currentPage:1,
        products: this.props.products.data,
        //catalogLink: ,
        //isSortBy,
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - PageShop`);
        if (this.props.products.status === 3) {
            this.setState({
                products:this.props.products.data,
            });
        }
    }

    componentDidMount() {
        console.log(`componentDidMount - PageShop`);
        this.props.dispatch( productsThunkAC(this.props.dispatch) );

        //appEvents.addListener('ESortingOnChange',this.sortingOnSelectChange);

        this.unlisten = history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            console.log(`The last navigation action was ${action}`)
        });
    }

    componentWillUnmount = () => {
        console.log(`componentWillUnmount - PageShop`);
        //appEvents.removeListener('onPageChangedEvent',this.dataPaginationToState);
        //appEvents.removeListener('ESortingOnChange',this.sortingOnSelectChange);
        this.unlisten();
    };

    render() {
        const {
            currentPage,
            //products,
            //catalogLink,
            //isSortBy,
            //favoriteList,

        } = this.state;
        const {match} = this.props;
        console.log(match.params);
        //let loaderImg = <img src={`./loader.gif`} alt={`Загрузка данных`}>

        if ( this.props.products.status<=1 )
            return <img src={loaderIcon} alt={`Загрузка данных`} />

        if ( this.props.products.status===2 )
            return "ошибка загрузки данных";

        return (

                    <Route exact path={`/${match.params.catalog}/`}>
                        <ShopCatalog currentPage={currentPage}
                                     products={this.props.products.data}
                        />
                    </Route>


        );
    }
}


const mapStateToProps = function (store) {
    return {
        products: store.products,
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