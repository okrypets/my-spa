import React, {PureComponent, Fragment} from 'react';
import ShoppingCart from '../Components/ShoppingCart'
import {
    Route,
    withRouter
} from "react-router-dom";
import {shoppingCartRemoveAC, shoppingCartAddAC, shoppingCartRemoveAllAC} from "../Redux/Actions/shoppingCartAC";
import {shoppingCartDELETEThunkAC, shoppingCartThunkAC, shoppingCartAddThunkAC, shoppingCartDELETEALLThunkAC} from "../Redux/Thunk/fetchThunkCart";
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


    UNSAFE_componentWillMount() {
        this.props.dispatch( shoppingCartThunkAC(this.props.dispatch));

    }

     componentDidUpdate(prevProps, prevState, Snapshot) {
        if (this.props.shoppingCart.status === 3) {
            this.setState({
                    shoppingCartProducts:this.props.shoppingCart.items,
                }
            );
        }
    }

    componentDidMount() {
        appEvents.addListener('EhandleClickAddToCart',this.addItemToShoppingCart);
        appEvents.addListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.addListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);

    }

    componentWillUnmount() {
        appEvents.removeListener('EhandleClickAddToCart',this.addItemToShoppingCart);
        appEvents.removeListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.removeListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);
    };

    addItemToShoppingCart = (item) => {
        this.props.dispatch(shoppingCartAddAC(item));//отправляем просто в REDUX
        this.props.dispatch(shoppingCartAddThunkAC(item));//отправляем в AJAX
    }

    deleteItemFromShoppingCart = (delItem) => {
        this.props.dispatch( shoppingCartRemoveAC(delItem)); //отправка в REDUX
        this.props.dispatch( shoppingCartDELETEThunkAC(delItem)) //отправлка в AJAX
    }

    deleteAllFromShoppingCartAfterSubmit = () => {
        const {shoppingCart} = this.props;
        this.props.dispatch( shoppingCartRemoveAllAC()); //отправка в REDUX
        this.props.dispatch( shoppingCartDELETEALLThunkAC(shoppingCart)) //отправлка в AJAX
    }


    render() {
        const {shoppingCart, history} = this.props;
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

    