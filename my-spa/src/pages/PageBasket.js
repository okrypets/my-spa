import React, {PureComponent, Fragment} from 'react';
import ShoppingCart from '../Components/ShoppingCart'
//import Success from "../Components/Success";
import {
    //Router,
    Route,
    //Switch,
    // Redirect,
    withRouter
} from "react-router-dom";
import {shoppingCartRemoveAC, shoppingCartAddAC, shoppingCartRemoveAllAC} from "../Redux/Actions/shoppingCartAC";
import {shoppingCartDELETEThunkAC, shoppingCartThunkAC, shoppingCartAddThunkAC, shoppingCartPUTThunkAC} from "../Redux/Thunk/fetchThunkCart";
import PropTypes from "prop-types";
import loaderIconGif from "../loader.gif";
import {connect} from "react-redux";
import {appEvents} from "../Components/events";

class PageBasket extends PureComponent  {

    static propTypes = {
        shoppingCart: PropTypes.object, //Redux
        history:PropTypes.object
    }

    state = {
        shoppingCartProducts: this.props.shoppingCart.items,
    }


    componentWillMount() {
        console.log(`componentWillMount - PageBasket`);
        this.props.dispatch( shoppingCartThunkAC(this.props.dispatch));

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - PageBasket`);
        if (this.props.shoppingCart.status === 3) {
            this.setState({
                    shoppingCartProducts:this.props.shoppingCart.items,
                }
            );
        }
    }

    componentDidMount() {
        console.log(`componentDidMount - PageBasket`);
        //appEvents.addListener('EdeleteItemFromShoppingCartAJAX',this.deleteItemFromShoppingCart);
        appEvents.addListener('EhandleClickAddToCart',this.addItemToShoppingCart);
        appEvents.addListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.addListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);

    }

    componentWillUnmount() {
        console.log(`componentWillUnmount - PageBasket`);
        //appEvents.removeListener('EdeleteItemFromShoppingCartAJAX',this.deleteItemFromShoppingCart);
        appEvents.removeListener('EhandleClickAddToCart',this.addItemToShoppingCart);
        appEvents.removeListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.removeListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);
    };

    addItemToShoppingCart = (item) => {
        console.log(`deleteItemFromShoppingCartAJAX - PageBasket`);
        this.props.dispatch(shoppingCartAddAC(item));//отправляем просто в REDUX
        this.props.dispatch(shoppingCartAddThunkAC(item));//отправляем в AJAX
    }

    deleteItemFromShoppingCart = (delItem) => {
        console.log(`deleteItemFromShoppingCartAJAX - PageBasket`);
        this.props.dispatch( shoppingCartRemoveAC(delItem)); //отправка в REDUX
        this.props.dispatch( shoppingCartDELETEThunkAC(delItem)) //отправлка в AJAX
    }

    deleteAllFromShoppingCartAfterSubmit = () => {
        console.log(`deleteAllFromShoppingCartAfterSubmit - PageBasket`);
        const {shoppingCart} = this.props;
        this.props.dispatch( shoppingCartRemoveAllAC()); //отправка в REDUX
        this.props.dispatch( shoppingCartPUTThunkAC(shoppingCart)) //отправлка в AJAX
    }


    render() {
        console.log(`PageBasket - RENDER`);
        const {shoppingCart, history} = this.props;
        console.log(shoppingCart);
        if ( shoppingCart.status<=1)
            return <img src={loaderIconGif} alt={`Загрузка данных`} />;

        if ( shoppingCart.status===2)
            return "ошибка загрузки данных";
        return (
            <Fragment>
                <Route exact path = {`/basket`}>
                    <ShoppingCart shoppingCart={shoppingCart.items}  history={history}/>
                </Route>
            </Fragment>

        );
    }

}

const mapStateToProps = function (state) {
    return {
        shoppingCart: state.shoppingCart,
    };
};
const withRouterPageBasket = withRouter(PageBasket);
export default connect(mapStateToProps)(withRouterPageBasket);

//export default withRouterPageBasket;

//export default PageBasket;

    