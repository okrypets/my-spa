import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import ShoppingCartItem from "./ShoppingCartItem";
//import {connect} from "react-redux";
import CheckOut from './CheckOut';
import {appEvents} from "./events";
import './ShoppingCart.scss'
//import {shoppingCartRemoveAC, shoppingCartRemoveAllAC } from "../Redux/Actions/shoppingCartAC";
//import {shoppingCartRemoveThunkAC} from '../Redux/Thunk/fetchThunkCart';
//import ReactTransitionGroup from 'react-addons-transition-group' // ES6
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import {shoppingCartAddThunkAC} from "../Redux/Thunk/fetchThunkCart";
//import {GREEN, RED} from "../pages/PageShop";
//import loaderIconGif from "../loader.gif";
//import {shoppingCartThunkAC} from "../Redux/Thunk/fetchThunkCart";

class ShoppingCart extends PureComponent {

    static propTypes = {
        shoppingCart: PropTypes.array,
        success:PropTypes.bool,
        history: PropTypes.object.isRequired,
    }

    state = {
        shoppingCartProducts: this.props.shoppingCart,
        success:true,
    }

    componentWillMount() {
        //console.log(`componentWillMount - ShoppingCart`);
       //this.props.dispatch( shoppingCartThunkAC(this.props.dispatch));
    }
    componentDidMount() {
        //console.log(`componentDidMount - ShoppingCart`);
        //this.props.dispatch( shoppingCartThunkAC(this.props.dispatch));
        appEvents.addListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.addListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);
    }

    componentWillUnmount() {
        //console.log(`componentWillUnmount - ShoppingCart`);
        appEvents.removeListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.removeListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //console.log(`componentWillReceiveProps - ShoppingCart`);

    }


    deleteItemFromShoppingCart = (delItem) => {
        //console.log(`deleteItemFromShoppingCart - ShoppingCart`);
        const {shoppingCartProducts} = this.state;
        let newshoppingCartProducts = [...shoppingCartProducts].filter(i => i.id !== delItem.id);
        this.setState({
            shoppingCartProducts: newshoppingCartProducts,
        });
    }

    deleteAllFromShoppingCartAfterSubmit =() => {
        //console.log(`deleteAllFromShoppingCartAfterSubmit`);
        //this.props.dispatch( shoppingCartRemoveAllAC());
        this.setState({
            shoppingCartProducts: [],
            success:true,
        }, () => this.successSubmit());
        //console.log(this.state.shoppingCartProducts);
        //console.log(this.state.success);
    }

    successSubmit = () => {
        //console.log(`successSubmit`);
        const {success} = this.state;
        const {history} = this.props;
        success &&
            history.push(`/success`);
    }

    render() {
        console.log(`ShoppingCart - RENDER`);
        const {shoppingCartProducts} = this.state;
        //const {shoppingCart} = this.props;
        //console.log(shoppingCartProducts);
        //console.log(shoppingCart);

        return(

            <div className={`ShoppingCart`}>
                {shoppingCartProducts.length > 0 &&
                <Fragment>
                    <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnter={false}
                    transitionLeave={true}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        shoppingCartProducts.map((item) => {
                                return <ShoppingCartItem
                                    key={item.id}
                                    item={item}
                                />
                            }
                        )
                    }
                    </ReactCSSTransitionGroup>
                    <CheckOut />
                </Fragment>
                    }
                {shoppingCartProducts.length === 0 &&
                    <h1>ShopCart is Empty</h1>
                }
            </div>
        );
    }

}
/*
const mapStateToProps = function (state) {
    return {
        shoppingCart: state.shoppingCart,
    };
};


 */

//const withRouterPageShop = withRouter(PageShop);
//export default connect(mapStateToProps)(ShoppingCart);
export default ShoppingCart


///{shoppingCartProducts.length > 0 && <CheckOut />}